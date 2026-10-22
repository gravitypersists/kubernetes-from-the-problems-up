/* w-samecode-scrolly content: every reader-visible word of the §02 drawing and step text.
   index.js holds behaviour only. Replaces the w-samecode carousel (user's Ch 2 human review,
   run/review/human-review.md: "turn this into a scrollytelling section"), following the course
   scrollytelling convention (CURRICULUM §8 step 6) and Ch 3's w-fleet-scrolly lane controller.

   Snapshot format (one complete state per step, so scrolling back restores it):
     state.image        null, or the image name drawn as a frame around both machines' rows
     state.values       machine id → row id → value shown in that machine's row
     state.markers      true: the marker column shows SAME / DIFFERENT for every row
                        (computed: equal values → SAME, else DIFFERENT)
     state.tests        machine id → { st, detail? }; st is one of
                          none        NOT RUN       (ink-3)
                          unknown     ?             (ink-3; screen readers hear STRINGS.unknownSr)
                          pass        PASS          (good)
                          fail        FAIL          (bad)
                          unreleased  NOT RELEASED  (ink-3, dashed)
   step.highlight      keys outlined for that step only: 'row:<id>', 'test:<machine>', 'image'
   step.text           paragraphs; `x` renders as code, **x** as a defined term (dfn)
   step.ariaLabel      the canvas's accessible description while that step is active
   Gates live in index.html (data-gate on the step), not here.

   Story (CURRICULUM §3, Ch 2): Riley's laptop has ImageResizer 7.0, production 6.2; Sam's first image
   fennel-app:v42 holds 6.2, so the failure shows on the laptop; Riley's v43 holds 7.0 and passes on both.
   Fennel, its people, tool names and versions are fiction. */
(function () {
  'use strict';

  var HAND = {
    laptop: { code: 'main', runtime: 'Python 3.12', libs: '12 libraries', photo: 'ImageResizer 7.0' },
    prod: { code: 'main', runtime: 'Python 3.12', libs: '12 libraries', photo: 'ImageResizer 6.2' }
  };
  var V42 = {
    laptop: { code: 'main', runtime: 'Python 3.12', libs: '12 libraries', photo: 'ImageResizer 6.2' },
    prod: { code: 'main', runtime: 'Python 3.12', libs: '12 libraries', photo: 'ImageResizer 6.2' }
  };
  var V43 = {
    laptop: { code: 'main', runtime: 'Python 3.12', libs: '12 libraries', photo: 'ImageResizer 7.0' },
    prod: { code: 'main', runtime: 'Python 3.12', libs: '12 libraries', photo: 'ImageResizer 7.0' }
  };
  var ERR = 'error: unknown option';

  window.SameCodeData = {
    STRINGS: {
      widgetShort: 'W-01',
      step: 'Step',
      machine: 'Machine',
      image: 'Image',
      same: 'Same',
      different: 'Different',
      sameGlyph: '=',
      differentGlyph: '≠',
      legend: '= same · ≠ different',
      tests: 'Tests',
      status: { none: 'Not run', unknown: '?', pass: 'Pass', fail: 'Fail', unreleased: 'Not released' },
      unknownSr: 'not known yet'
    },

    MACHINES: [
      { id: 'laptop', name: 'Riley’s laptop' },
      { id: 'prod', name: 'Production' }
    ],

    /* key: the row's label on wide canvases; on narrow ones only the value shows, prefixed with
       narrowPrefix where the value alone would be unclear (the code row: "code: main") */
    ROWS: [
      { id: 'code', key: 'Code', tone: 'c1', narrowPrefix: 'code: ' },
      { id: 'runtime', key: 'Runtime', tone: 'c2' },
      { id: 'libs', key: 'Libraries', tone: 'c2' },
      { id: 'photo', key: 'Photo resizing', tone: 'c2' }
    ],

    LANES: {
      A: {
        name: 'Installed by hand',
        steps: [
          {
            id: 'A1',
            text: [
              'Riley’s change is ready to ship. On one side, Riley’s laptop, where the change was written. On the other, Fennel’s production machine, where customers will use it. Each was set up by hand: the laptop last month, by Riley, from the wiki page; production in Year 0, by Sam.',
              'The code is the same on both: `main`, the team’s shared copy of the code, with Riley’s change in it.'
            ],
            state: { image: null, values: HAND, markers: false, tests: { laptop: { st: 'none' }, prod: { st: 'none' } } },
            highlight: [],
            ariaLabel: 'Riley’s laptop and the production machine, side by side. Laptop: code main, Python 3.12, 12 libraries, ImageResizer 7.0. Production: code main, Python 3.12, 12 libraries, ImageResizer 6.2. Tests not run.'
          },
          {
            id: 'A2',
            text: [
              'Compare them row by row. Same code. Same version of Python, the language the Fennel app is written in. Same 12 libraries, the ready-made code the app builds on.',
              'One row is different: ImageResizer, the tool that resizes product photos. Riley installed the newest version, 7.0. Production still has 6.2, the version Sam installed by hand in Year 0. Nothing compares the two machines, so nobody has noticed.'
            ],
            state: { image: null, values: HAND, markers: true, tests: { laptop: { st: 'none' }, prod: { st: 'none' } } },
            highlight: ['row:photo'],
            ariaLabel: 'Row by row: code, Python and the 12 libraries are the same on both machines. Photo resizing is different: ImageResizer 7.0 on Riley’s laptop, 6.2 in production. Tests not run.'
          },
          {
            id: 'A3',
            text: [
              'Riley’s change uses a photo option that first appeared in ImageResizer 7.0. On the laptop, Riley runs Fennel’s tests, small programs that try the app out automatically, including uploading a product photo. Every test passes.'
            ],
            state: { image: null, values: HAND, markers: true, tests: { laptop: { st: 'pass' }, prod: { st: 'unknown', detail: 'not shipped yet' } } },
            highlight: ['test:laptop'],
            ariaLabel: 'Tests pass on Riley’s laptop, with ImageResizer 7.0. Production, with ImageResizer 6.2: not shipped yet, result unknown. Everything else is the same.'
          },
          {
            id: 'A4',
            text: [
              'The change ships. The first time a customer uploads a product photo, it fails: ImageResizer 6.2 doesn’t have the option Riley’s code asks for.',
              'Riley tries the same upload on the laptop. It works, every time. “Can’t reproduce.” The bug is real, but it lives in the difference between two machines, and nobody is looking there.'
            ],
            state: { image: null, values: HAND, markers: true, tests: { laptop: { st: 'pass' }, prod: { st: 'fail', detail: ERR } } },
            highlight: ['row:photo', 'test:prod'],
            ariaLabel: 'Photo upload fails in production, error: unknown option, with ImageResizer 6.2. It passes on Riley’s laptop, with 7.0. Everything else is the same.'
          }
        ]
      },

      B: {
        name: 'Packed in an image',
        steps: [
          {
            id: 'B1',
            text: [
              'Rewind to before Riley’s change ships. This time, Sam has packed the Fennel app into an **image**: one sealed package that holds the code, Python, the 12 libraries and ImageResizer. It’s called `fennel-app:v42`. Sam built it to match production, so it holds ImageResizer 6.2.',
              'Both machines now run the app from that same image, so every row reads the same: each one comes from the image, not from whatever was installed on the machine. Riley’s hand-installed 7.0 is still on the laptop, but the app no longer uses it.'
            ],
            state: { image: 'fennel-app:v42', values: V42, markers: true, tests: { laptop: { st: 'none' }, prod: { st: 'unreleased' } } },
            highlight: ['image'],
            ariaLabel: 'Both machines run the image fennel-app:v42. Inside it, on both: code main, Python 3.12, 12 libraries, ImageResizer 6.2. Every row is the same. Tests not run on the laptop; nothing released to production.'
          },
          {
            id: 'B2',
            text: [
              'Riley runs the same tests as before, on the same laptop, but this time the app runs from `fennel-app:v42`.'
            ],
            state: { image: 'fennel-app:v42', values: V42, markers: true, tests: { laptop: { st: 'unknown', detail: 'running…' }, prod: { st: 'unreleased' } } },
            highlight: ['test:laptop'],
            ariaLabel: 'Both machines run fennel-app:v42, every row the same, ImageResizer 6.2 on both. Tests running on Riley’s laptop, result unknown. Nothing released to production.'
          },
          {
            id: 'B3',
            text: [
              'The tests fail, on Riley’s laptop, with the same error customers would have hit: `error: unknown option`.',
              'That isn’t a step backwards. Catching a problem before it reaches production is exactly what tests are for, and they can only do it when the machine running them matches production. The bug that was “can’t reproduce” now takes Riley ten minutes to find, on a laptop, and no customer ever sees it.'
            ],
            state: { image: 'fennel-app:v42', values: V42, markers: true, tests: { laptop: { st: 'fail', detail: ERR }, prod: { st: 'unreleased', detail: 'would fail the same way' } } },
            highlight: ['test:laptop'],
            ariaLabel: 'Tests fail on Riley’s laptop, error: unknown option, inside fennel-app:v42 with ImageResizer 6.2. Production: not released; it would fail the same way. Every row is the same.'
          },
          {
            id: 'B4',
            text: [
              'To ship the change, Riley needs ImageResizer 7.0 inside the image. Nobody can edit an image once it’s built, so Riley builds a new one, `fennel-app:v43`, with 7.0 inside. `v42` stays exactly as it was.',
              'The tests pass on the laptop. Production runs the same `v43`, so photo upload works there too.'
            ],
            state: { image: 'fennel-app:v43', values: V43, markers: true, tests: { laptop: { st: 'pass' }, prod: { st: 'pass' } } },
            highlight: ['image', 'row:photo'],
            ariaLabel: 'Both machines run the new image fennel-app:v43, with ImageResizer 7.0 on both. Every row is the same. Tests pass on Riley’s laptop and in production.'
          }
        ]
      }
    }
  };
})();
