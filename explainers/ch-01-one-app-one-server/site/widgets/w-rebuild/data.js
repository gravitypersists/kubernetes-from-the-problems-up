/* w-rebuild content: every reader-visible word, row, notes step and check for the widget.
   index.js holds behaviour only, so a later chapter can re-skin the stage-4 comparison by
   swapping this file (plan reuse note: Ch 2 "same code, one dependency version different";
   Ch 15 capstone scenarios). Nothing here is reader-configurable.

   Model (plan ### w-rebuild): two machines share one item list. Each item says whether it is on
   Sam's server, which notes step (if any) installs it on the new machine, when and why it was
   added, and what breaks without it. Launch checks pass only if every item they need is present
   on the new machine; index.js computes that, nothing is hard-coded per check.

   Fields
     items[].cat         category label; consecutive rows with the same cat are grouped
     items[].short       stage-4 row label (the full label is shown in stages 1–3)
     items[].card        stage-1 card text (null: no card; the code row is shown from the start)
     items[].onSam       present on Sam's server
     items[].step        notes step that installs it on the new machine (null: the notes miss it)
     items[].kind        for missing items: 'installed' (a program on the machine) | 'config'
                         (a setting or key); this is the correct k-04 diagnosis for a check that
                         fails because the item is missing
     items[].hiddenUntil stage the row first appears in (the holiday-sale setting: stage 4)
     items[].unknown     nobody can say whether it matters (status UNKNOWN, c6 dashed)
     items[].same        stage 4 shows IDENTICAL across both machines (the code)
     items[].versions    optional {sam, new} strings shown instead of PRESENT (unused in Ch 1;
                         the hook Ch 2 needs for "one dependency version different")
   Claims (facts.md): c-01 machine-installed runtime/libraries/tools; c-02 config outside the code;
   c-03 full disk stops the database recording orders; c-06 unrecorded hand-made changes (drift);
   c-07 settings nobody can explain. Misconceptions confronted (catalog IDs): m-19 "the code is
   the app" (stage 3, k-04 "The code" option), m-20 "a runbook removes the risk" (k-03 option A).
   Dates, times and the holiday-sale setting are Fennel fiction. */
(function () {
  'use strict';
  var NEEDS_BASE = ['code', 'runtime', 'libs', 'config', 'db'];

  var data = {
    widgetNo: 'W-01',
    title: 'Rebuild Sam’s server',

    machines: {
      sam: { bar: 'Machine · Sam’s server', column: 'Sam’s server', columnShort: 'Sam’s server' },
      new: { bar: 'Machine · New', column: 'New machine', columnShort: 'New machine' }
    },

    stages: [
      { name: 'What’s on Sam’s server', lead: 'Sam’s server, as most people picture it.', leadAfter: 'Sam’s server, as it really is.' },
      { name: 'Rebuild from the notes', lead: 'Monday. Jordan asks Sam: if this server died, could we build another? Sam hands over the notes.' },
      { name: 'Launch checks', lead: 'The new machine runs five launch checks. Tap each FAIL to diagnose it.' },
      { name: 'Compare', lead: 'Sam’s server and the new machine, row by row.' }
    ],

    items: [
      { id: 'code', cat: 'Code', label: 'Fennel app code (from the repo)', short: 'Fennel app code', card: null,
        onSam: true, step: 4, same: true, without: 'nothing runs', compareNote: 'Same code.' },
      { id: 'runtime', cat: 'Runtime', label: 'Language runtime the code is written for (say, Python)', short: 'Language runtime',
        card: 'Language runtime', onSam: true, step: 2, without: 'the app won’t start' },
      { id: 'libs', cat: 'Libraries & tools', label: 'Libraries the code uses (web framework, payments library)', short: 'Libraries the code uses',
        card: 'Libraries the code uses', onSam: true, step: 4, without: 'the app won’t start' },
      { id: 'photo', cat: 'Libraries & tools', label: 'Photo-resizing tool', short: 'Photo-resizing tool',
        card: 'Photo-resizing tool', onSam: true, step: null, kind: 'installed',
        added: 'Installed by hand in May, when product photos launched.',
        without: 'product photo uploads fail' },
      { id: 'config', cat: 'Config', label: 'Config file: database address, site name, payment key', short: 'Config file',
        card: 'Config file (database address, site name, payment key)', onSam: true, step: 5,
        without: 'the app can’t find its database or take payments' },
      { id: 'email', cat: 'Config', label: 'Email service key', short: 'Email service key',
        card: 'Email service key', onSam: true, step: null, kind: 'config',
        added: 'Added in August, when order emails launched.',
        without: 'order confirmation emails don’t send' },
      { id: 'logs', cat: 'Config', label: 'Nightly log-cleanup job', short: 'Nightly log-cleanup job',
        card: 'Nightly log-cleanup job', onSam: true, step: null, kind: 'config',
        added: 'Set up by hand last Friday at 23:00, after the outage.',
        without: 'nothing fails today; in a few months the disk fills and Friday happens again',
        callout: 'No check caught this one. It’s the fix for Friday’s outage, and the new machine doesn’t have it.' },
      { id: 'db', cat: 'Disk & data', label: 'Database and its data (orders, customers)', short: 'Database and its data',
        card: 'Database and its data', onSam: true, step: 3, disk: true,
        without: 'no orders, no customers' },
      { id: 'sale', cat: 'Config', label: 'Web-server setting changed during the holiday sale', short: 'Web-server setting (holiday sale)',
        card: null, onSam: true, step: null, hiddenUntil: 4, unknown: true,
        newLabel: 'not installed', without: 'unknown',
        quote: 'Sam: “I think that was for the sale. Not sure it still matters.”' }
    ],

    /* Stage-1 cards, deliberately not in category order (plan: "unordered, not grouped"). */
    cardOrder: ['db', 'photo', 'runtime', 'logs', 'config', 'libs', 'email'],

    disk: { sam: 31, new: 9, label: 'Disk' },

    notes: {
      title: 'Sam’s notes · written at setup, last edited 14 months ago',
      steps: [
        { text: 'Rent a server with a fresh operating system', adds: [], frame: true,
          said: 'server rented, fresh operating system, nothing else on it' },
        { text: 'Install the language runtime', adds: ['runtime'], said: 'language runtime installed' },
        { text: 'Install the database; copy the data over from last night’s backup', adds: ['db'],
          said: 'database installed, data copied' },
        { text: 'Download the Fennel code from the repo; install its libraries', adds: ['code', 'libs'],
          said: 'Fennel code downloaded, libraries installed' },
        { text: 'Create the config file: database address, site name, payment key', adds: ['config'],
          said: 'config file created' },
        { text: 'Start the app', adds: [], start: true, said: 'the app is running' }
      ],
      empty: 'Fresh operating system. Nothing else yet.',
      noMachine: 'No machine yet',
      allRan: 'All six steps ran without an error.',
      allNotes: 'All six notes',
      samHidden: 'Still running (hidden for now).',
      showInstalled: 'Show what the notes installed ({n})'
    },

    /* k-02 (verbatim from the plan; "photo-resizing tool" per the orchestrator's logged ruling) */
    k02: {
      label: 'Check 02 / 09 · tap all that apply',
      prompt: 'Besides the code, what has to be on this machine for the Fennel site to keep working? Tap everything you think is there, then reveal.',
      reveal: 'Reveal what’s on it',
      picked: 'You picked {n} of 7. All seven are on Sam’s server, and the site relies on every one: some today, one only when the disk next fills up.',
      missedTag: 'You missed this',
      missedText: 'Most people picture the code and maybe a database. The rest was installed or set up on the machine by hand, so it never shows up in the code.',
      next: 'Next: rebuild it'
    },

    /* k-03 */
    k03: {
      label: 'Check 03 / 09',
      prompt: 'All six steps in Sam’s notes ran without an error, and the code is the same version as on Sam’s server. Will the new machine work like the old one?',
      options: [
        /* review P-01: balanced lengths, every option a verdict with a partly-true reason; key at B */
        { key: 'A', text: 'Yes. The notes are old, but same code and every step leaves nothing missing.',
          fb: 'That’s the trap. The notes list what Sam remembered to write down at setup. The code was never the problem; the question is what else was on Sam’s server. Run the checks and see.' },
        { key: 'B', text: 'It will start, but some features will be broken or missing.', ok: true,
          fb: 'Right. The notes cover what existed at setup. Anything added by hand since then isn’t in them. Run the checks to find out what.' },
        { key: 'C', text: 'No. The code is fine, but out-of-date notes mean it won’t start.',
          fb: 'The notes are out of date, but not in a way that stops the app starting: the runtime, libraries, config and database are all in them. The gaps are subtler than that.' }
      ],
      run: 'Run launch checks'
    },

    /* Launch checks (stage 3), run in order. `needs` are item ids on the new machine. */
    checks: [
      { id: 'home', label: 'Home page loads', needs: NEEDS_BASE },
      { id: 'search', label: 'Search products', needs: NEEDS_BASE },
      { id: 'order', label: 'Place a test order', needs: NEEDS_BASE },
      { id: 'photo', label: 'Upload a product photo', short: 'Photo upload', needs: NEEDS_BASE.concat('photo'),
        error: 'error: resize failed',
        prompt: 'Photo upload fails with “resize failed”. What’s missing on the new machine?',
        fb: {
          code: 'The code is identical on both machines, so it can’t be the difference. The difference is on the machine.',
          installed: 'Right. The code hands photos to a photo-resizing tool that Sam installed by hand in May. The new machine doesn’t have it, and the notes never mentioned it.',
          config: 'Close. Config tells the app where things are. Here the missing piece is a program the code calls, installed on the machine.'
        } },
      { id: 'email', label: 'Order confirmation email', short: 'Confirmation email', needs: NEEDS_BASE.concat('email'),
        error: 'not sent',
        prompt: 'Order confirmation emails aren’t sent. What’s missing?',
        fb: {
          code: 'The code is identical on both machines, so it can’t be the difference. The difference is on the machine.',
          installed: 'Not this time. Nothing needs installing; the app just doesn’t have the key that lets it use the email service.',
          config: 'Right. The email service key was added to Sam’s config when order emails launched. The notes were written before that.'
        } }
    ],
    checksText: {
      label: 'Launch checks · new machine',
      queued: 'Queued',
      running: 'Running',
      diagnose: 'Why? Tap to diagnose.',
      hide: 'Hide diagnosis',
      again: 'Diagnosed · show again',
      k04label: 'Check 04 / 09 · diagnose',
      done: 'Launch checks done: {pass} pass, {fail} fail.',
      compare: 'Compare the two machines'
    },
    diagnoses: [
      { id: 'code', key: 'A', text: 'The code' },
      { id: 'installed', key: 'B', text: 'Something installed on the machine' },
      { id: 'config', key: 'C', text: 'A setting or key in the config' }
    ],

    compare: {
      identical: 'Identical',
      present: 'Present',
      missing: 'Missing',
      unknown: 'Unknown',
      inNotes: 'In the notes · step {n}',
      without: 'Without it: ',
      summary: 'Same code. Every step in the notes ran. Three things missing, and one nobody can explain.'
    },

    ui: {
      startOver: 'Start over',
      stageOf: 'Stage {n} / {total}',
      predict: 'PREDICT', apply: 'APPLY',
      running: 'Running', notStarted: 'Not started',
      withoutIt: 'without it: ',
      picked: 'Picked', pickedOf: '{n} / {total} picked',
      stepN: 'Step {n}', stepOf: 'Step {n} of {total}', runStep: 'Run step {n} of {total}',
      done: 'Done', doneCount: '{n} / {total} done',
      pass: 'Pass', fail: 'Fail',
      diskUsed: 'used',
      compareLabel: 'Sam’s server and the new machine, row by row',
      colItem: 'What’s on the machine', colNote: 'What it means',
      correct: 'Correct', notQuite: 'Not quite', yourPick: 'Your pick', answer: 'Answer',
      tryAgain: 'Try again', whyOthers: 'Why the other answers miss', whatOthers: 'What the other answers say',
      /* screen-reader sentences (aria-live) */
      pickSay: '{card}: picked. {n} of {total} picked.',
      unpickSay: '{card}: not picked. {n} of {total} picked.',
      missedSay: 'You missed: {list}.',
      stageSay: 'Stage {n} of {total}: {name}.',
      stepSay: 'Step {n} of {total} done: {said}.',
      compareReady: 'Both failures diagnosed. You can compare the two machines.',
      startedOver: 'Started over. Stage 1 of 4: What’s on Sam’s server.'
    }
  };

  window.DidacticianData = window.DidacticianData || {};
  window.DidacticianData['w-rebuild'] = data;
})();
