/* w-samecode content: every reader-visible word, row, band, check and announcement.
   index.js holds behaviour only. Adapted from Ch 1's w-rebuild data.js (stage-4 comparison);
   Ch 1's files are untouched. Reuse candidates (plan): Ch 15 capstone "passed in staging, fails
   in production" scenarios, possibly Ch 9 (same image, different settings per environment).
   Nothing here is reader-configurable.

   Model (plan ### w-samecode): two machines share one row list. Each row has a category, a label
   and a per-state value for each machine. index.js computes the marker (IDENTICAL for the code
   row, SAME if the two values are equal, DIFFERENT if not) and the result row from `result`:
   a machine PASSes iff its value on `result.row` is at least `result.min` (Riley's code uses a
   photo option that arrived in 7.0). Nothing is hard-coded per state.

   Fields
     machines[]            column order; `id` keys the per-state values
     rows[id].cat          category label (mono, uppercase via CSS)
     rows[id].label        row label
     rows[id].note         optional caption under the label
     rows[id].same         the code row: shows IDENTICAL across both machines
     rows[id].values[i]    state i+1: { laptop, prod } (absent: the row isn't shown in that state)
     states[].bands        bands in order: { kind: 'hand' | 'image' | 'outside', label, image?, rows }
                           (enter: the band slides in when its state opens)
     states[].resultAfter  index of the band the result row follows
     states[].hide         machine id → check id that must be committed before that result shows
     states[].check        the prediction in this state (k02 / k03) or null
     states[].tags         machine id → tag under that machine's result once shown
     states[].hypo         machines whose result is hypothetical (not released; review A-02): drawn
                           dashed, no error line, announced with its tag
     states[].exit         last state: link on to the next section
   Claims (facts.md): c-01 image contents; c-02 settings handed in at start; c-03 stack differences
   cause production-only failures; c-04 immutable, a change means a new image; c-06 data kept
   outside the container. Misconceptions (catalog IDs, never shown): m-19 "the code is the app"
   (k-02 B); the new trap "the image is the whole app" (state 3 NOT IN THE IMAGE band). The page's
   k-06/k-07 carry m-24/m-23; this widget doesn't.
   Fennel fiction (d-04): Riley, photo tool 6.2 vs 7.0, fennel-app:v42/v43. Never statistics. */
(function () {
  'use strict';

  var data = {
    widgetNo: 'W-01',
    title: 'Same code, two machines',

    machines: [
      { id: 'laptop', column: 'Riley’s laptop' },
      { id: 'prod', column: 'Production' }
    ],

    rows: {
      code: { cat: 'Code', label: 'Fennel app code, with Riley’s change', note: 'Same code.', same: true,
        values: [{ laptop: 'same', prod: 'same' }, { laptop: 'same', prod: 'same' }, { laptop: 'same', prod: 'same' }] },
      runtime: { cat: 'Runtime', label: 'Language runtime (Python)',
        values: [{ laptop: '3.12', prod: '3.12' }, { laptop: '3.12', prod: '3.12' }, { laptop: '3.12', prod: '3.12' }] },
      libs: { cat: 'Libraries & tools', label: 'Libraries the code uses',
        values: [{ laptop: 'same versions', prod: 'same versions' }, { laptop: 'same versions', prod: 'same versions' }, { laptop: 'same versions', prod: 'same versions' }] },
      photo: { cat: 'Libraries & tools', label: 'Photo-resizing tool',
        values: [{ laptop: '7.0', prod: '6.2' }, { laptop: '6.2', prod: '6.2' }, { laptop: '7.0', prod: '7.0' }] },
      config: { cat: 'Config', label: 'Settings (database address, keys)', note: 'handed in at start, by design',
        values: [null, null, { laptop: 'test', prod: 'production' }] },
      data: { cat: 'Disk & data', label: 'Data (orders)', note: 'kept outside the container',
        values: [null, null, { laptop: 'test orders', prod: 'real orders' }] }
    },

    result: {
      cat: 'Test', label: 'Upload a product photo',
      row: 'photo', min: '7.0',
      fail: 'error: unknown option',
      hidden: '?', hiddenSr: 'not run yet'
    },

    states: [
      {
        name: 'Installed by hand',
        lead: 'Riley joined last month and spent the first week installing tools on a new laptop. Riley’s change uses a photo option that arrived in version 7.0 of the photo-resizing tool. Production still has 6.2, installed by Sam in Year 0.',
        bands: [{ kind: 'hand', label: 'Installed by hand on each machine', rows: ['code', 'runtime', 'libs', 'photo'] }],
        resultAfter: 0,
        hide: { prod: 'k02' },
        check: 'k02',
        followup: 'Riley runs it again on the laptop: it works. “Can’t reproduce.”',
        next: { label: 'Next: pack it in an image' }
      },
      {
        name: 'One image',
        lead: 'Sam packs the code, runtime, libraries and photo tool into one sealed package, an image called fennel-app:v42. Sam built it to match production, so it holds photo tool 6.2. Riley’s laptop now runs that image, and production would run exactly the same one.',
        bands: [{ kind: 'image', label: 'In the image', image: 'fennel-app:v42', rows: ['code', 'runtime', 'libs', 'photo'] }],
        resultAfter: 0,
        hide: { laptop: 'k03', prod: 'k03' },
        tags: { laptop: 'caught before release', prod: 'not released: would fail the same way' },
        hypo: ['prod'],
        check: 'k03',
        next: { label: 'Build {img} with photo tool 7.0', img: 'fennel-app:v43' }
      },
      {
        name: 'A new image',
        lead: 'An image can’t be edited. To change the photo tool, Riley builds a new image, fennel-app:v43, with 7.0 inside. v42 stays exactly as it was.',
        bands: [
          { kind: 'image', label: 'In the image', image: 'fennel-app:v43', rows: ['code', 'runtime', 'libs', 'photo'] },
          { kind: 'outside', label: 'Not in the image', rows: ['config', 'data'], enter: true }
        ],
        resultAfter: 0,
        hide: {},
        check: null,
        exit: { label: 'Continue to § 03 ↓', href: '#s-03' },
        summary: 'Same image on both machines, so the photo tool can’t differ. What’s outside the image still can, and that’s on purpose.'
      }
    ],

    /* k-02 · predict · o-1 · verbatim from the plan. B carries m-19 ("the code is the app"). */
    k02: {
      chip: 'PREDICT', label: 'Check 02 / 07',
      prompt: 'Riley’s change passes every test on the laptop. The code is identical on both machines. What happens when the change ships to production?',
      options: [
        { key: 'A', ok: true, text: 'Photo upload fails in production, while on Riley’s laptop it keeps working, so nobody can reproduce it.',
          fb: 'Right. Riley’s code asks the photo tool for an option only 7.0 understands. Production has 6.2, so uploads fail there and only there. On the laptop it works every time. That’s a “can’t reproduce” bug.' },
        { key: 'B', text: 'Photo upload works in production too: the code is identical, and it passed every test on the laptop.',
          fb: 'That’s “the code is the app” again. The tests ran on Riley’s laptop, with photo tool 7.0. Production has 6.2, which doesn’t know the option Riley’s code uses.' },
        { key: 'C', text: 'The release refuses to install on production at all, because the two machines’ tools don’t match.',
          fb: 'Nothing checks the tools when new code is copied over. The release installs and runs. It fails later, the first time a customer uploads a photo.' }
      ]
    },

    /* k-03 · predict · o-1 · verbatim from the plan. B is the tempting "the image solves it". */
    k03: {
      chip: 'PREDICT', label: 'Check 03 / 07',
      prompt: 'Both machines now run the same image, fennel-app:v42, which contains photo tool 6.2. Riley tests the same change on the laptop. What happens?',
      options: [
        { key: 'A', text: 'The tests pass on the laptop and photo upload fails in production, just as it did before the image.',
          fb: 'Not any more. The laptop no longer uses the 7.0 Riley installed. It runs what’s in the image, 6.2, exactly like production.' },
        { key: 'B', text: 'Photo upload works on both: the image packages the tool, so the version problem is solved.',
          fb: 'The image doesn’t change what’s inside it. It holds 6.2, and Riley’s code needs 7.0. What it changes is where you find out.' },
        { key: 'C', ok: true, text: 'The tests fail on Riley’s laptop, the same way the change would have failed in production.',
          fb: 'Right. Same image, same photo tool, same failure, but now on Riley’s laptop, before release, where it costs Riley ten minutes instead of costing customers a broken feature.' }
      ]
    },

    ui: {
      stateOf: 'State {n} / {total}',
      startOver: 'Start over',
      colItem: 'What runs the app', colMarker: 'Same or different',
      tableLabel: 'Riley’s laptop and production, row by row',
      identical: 'Identical', same: 'Same', different: 'Different',
      pass: 'Pass', fail: 'Fail',
      correct: 'CORRECT', notQuite: 'NOT QUITE', yourPick: 'YOUR PICK', answer: 'ANSWER',
      tryAgain: 'TRY AGAIN', whyOthers: 'Why the other answers miss', whatOthers: 'What the other answers say',
      /* screen-reader sentences (aria-live) */
      stateSay: 'State {n} of {total}: {name}.',
      resultSay: '{machine}: photo upload {status}{detail}.',
      bothSay: 'Both machines: photo upload {status}{detail}.',
      notRunSay: '{machine}: photo upload not run yet.',
      rowBothSay: '{label}: {value} on both machines.',
      rowEachSay: '{label}: {a} on {m1}, {b} on {m2}, {marker}.',
      newRowSay: '{band}: {label}, {a} on {m1} and {b} on {m2}, {marker}, {note}.',
      startedOver: 'Started over. State 1 of 3: installed by hand. Results hidden again.'
    }
  };

  window.DidacticianData = window.DidacticianData || {};
  window.DidacticianData['w-samecode'] = data;
})();
