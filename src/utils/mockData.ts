import { PlaywrightReport, Test, TestStep, TestSuite, TestSpec } from '../types/playwrightReport';

// Generate a mock step with attachments
const createMockStep = (
  id: string,
  title: string,
  status: 'passed' | 'failed' | 'skipped',
  duration: number,
  start: number
): TestStep => {
  const end = start + duration;
  return {
    id,
    title,
    duration,
    status,
    start,
    end,
    attachments: status !== 'skipped' ? [
      {
        name: 'screenshot',
        contentType: 'image/png',
        path: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 100)}`
      },
      ...(Math.random() > 0.5 ? [{
        name: 'console',
        contentType: 'text/plain',
        body: `Console output for ${title}:\n> Loading page\n> Page loaded\n> Element found`
      }] : []),
      {
        name: 'trace',
        contentType: 'application/zip',
        path: `trace-${id}.zip`
      },
      {
        name: 'video',
        contentType: 'video/webm',
        path: `video-${id}.webm`
      }
    ] : []
  };
};

// Generate a mock test
const createMockTest = (
  id: string,
  title: string,
  status: 'passed' | 'failed' | 'skipped' | 'timedOut',
  projectName: string,
  startTime: number
): Test => {
  const duration = Math.floor(Math.random() * 5000) + 1000;
  const steps: TestStep[] = [];
  let currentStart = startTime;
  
  // Generate 2-5 steps
  const stepCount = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < stepCount; i++) {
    const stepDuration = Math.floor(duration / stepCount);
    const stepStatus = status === 'failed' && i === stepCount - 1 ? 'failed' : 'passed';
    steps.push(createMockStep(
      `step-${id}-${i}`,
      `Step ${i + 1}: ${['Navigate to page', 'Click button', 'Fill form', 'Verify element', 'Check results'][i % 5]}`,
      stepStatus,
      stepDuration,
      currentStart
    ));
    currentStart += stepDuration;
  }

  return {
    id,
    title,
    projectName,
    duration,
    status,
    annotations: [
      { type: status === 'passed' ? '@smoke' : '@regression' }
    ],
    steps,
    start: startTime,
    end: startTime + duration,
    ...(status === 'failed' ? {
      error: {
        message: 'Expected element to be visible, but it was not found on the page',
        stack: 'Error: Expected element to be visible\n    at Object.checkElement (/tests/helpers.ts:25:11)\n    at Object.test (/tests/example.spec.ts:42:5)'
      }
    } : {})
  };
};

// Generate mock specs
const createMockSpec = (id: string, title: string, tags: string[], testCount: number, passCount: number, startTime: number): TestSpec => {
  const tests: Test[] = [];
  let currentStart = startTime;
  
  for (let i = 0; i < testCount; i++) {
    let status: 'passed' | 'failed' | 'skipped' | 'timedOut';
    if (i < passCount) {
      status = 'passed';
    } else if (i === passCount && Math.random() > 0.7) {
      status = 'skipped';
    } else if (i === passCount + 1 && Math.random() > 0.8) {
      status = 'timedOut';
    } else {
      status = 'failed';
    }
    
    const test = createMockTest(
      `test-${id}-${i}`,
      `${title} - Test ${i + 1}`,
      status,
      ['chrome', 'firefox', 'webkit'][i % 3],
      currentStart
    );
    
    tests.push(test);
    currentStart += test.duration + Math.floor(Math.random() * 1000);
  }
  
  return {
    id,
    title,
    file: `tests/${title.toLowerCase().replace(/\s+/g, '-')}.spec.ts`,
    line: Math.floor(Math.random() * 100) + 1,
    column: Math.floor(Math.random() * 20) + 1,
    tags,
    tests,
    severity: Math.random() > 0.7 ? 'critical' : 'normal'
  };
};

// Generate mock suites
const createMockSuites = (): TestSuite[] => {
  const features = ['Authentication', 'Dashboard', 'User Profile', 'Settings'];
  const suites: TestSuite[] = [];
  let startTime = Date.now() - 3600000; // Start 1 hour ago
  
  for (let i = 0; i < features.length; i++) {
    const specsCount = Math.floor(Math.random() * 3) + 1;
    const specs: TestSpec[] = [];
    
    for (let j = 0; j < specsCount; j++) {
      const testCount = Math.floor(Math.random() * 5) + 2;
      const passCount = Math.floor(testCount * (Math.random() * 0.5 + 0.5)); // 50-100% pass rate
      
      specs.push(createMockSpec(
        `spec-${i}-${j}`,
        `${features[i]} ${['Validation', 'Navigation', 'Actions', 'Form Submission'][j % 4]}`,
        j % 2 === 0 ? ['@smoke'] : ['@regression'],
        testCount,
        passCount,
        startTime
      ));
      
      startTime += 60000; // Add 1 minute between specs
    }
    
    suites.push({
      title: features[i],
      file: `tests/${features[i].toLowerCase()}.spec.ts`,
      line: 1,
      column: 1,
      specs
    });
  }
  
  return suites;
};

// Generate complete mock report
export const generateMockReport = (): PlaywrightReport => {
  const suites = createMockSuites();
  
  // Calculate stats
  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let timedOut = 0;
  let totalDuration = 0;
  
  suites.forEach(suite => {
    suite.specs.forEach(spec => {
      spec.tests.forEach(test => {
        total++;
        if (test.status === 'passed') passed++;
        else if (test.status === 'failed') failed++;
        else if (test.status === 'skipped') skipped++;
        else if (test.status === 'timedOut') timedOut++;
        totalDuration += test.duration;
      });
    });
  });
  
  return {
    config: {
      testDir: './tests',
      projects: [
        {
          name: 'chromium',
          metadata: {
            browser: 'chromium',
            platform: 'linux',
            engine: 'V8',
            os: 'Ubuntu 22.04'
          }
        },
        {
          name: 'firefox',
          metadata: {
            browser: 'firefox',
            platform: 'linux',
            engine: 'SpiderMonkey',
            os: 'Ubuntu 22.04'
          }
        },
        {
          name: 'webkit',
          metadata: {
            browser: 'webkit',
            platform: 'linux',
            engine: 'JavaScriptCore',
            os: 'Ubuntu 22.04'
          }
        }
      ]
    },
    suites,
    errors: [],
    stats: {
      total,
      expected: passed,
      unexpected: failed + timedOut,
      flaky: 0,
      skipped,
      ok: failed === 0 && timedOut === 0,
      duration: totalDuration
    }
  };
};

export const mockReport = generateMockReport();