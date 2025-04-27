export interface PlaywrightReport {
  config: ReportConfig;
  suites: TestSuite[];
  errors: string[];
  stats: TestStats;
}

export interface ReportConfig {
  testDir: string;
  projects: ProjectConfig[];
}

export interface ProjectConfig {
  name: string;
  metadata: {
    browser?: string;
    platform?: string;
    engine?: string;
    os?: string;
  };
}

export interface TestStats {
  total: number;
  expected: number;
  unexpected: number;
  flaky: number;
  skipped: number;
  ok: boolean;
  duration: number;
}

export interface TestSuite {
  title: string;
  file: string;
  line: number;
  column: number;
  specs: TestSpec[];
  suites?: TestSuite[];
}

export interface TestSpec {
  title: string;
  id: string;
  file: string;
  line: number;
  column: number;
  tags: string[];
  tests: Test[];
  severity?: 'critical' | 'normal' | 'low';
}

export interface Test {
  id: string;
  title: string;
  projectName: string;
  duration: number;
  status: 'passed' | 'failed' | 'skipped' | 'timedOut';
  annotations: TestAnnotation[];
  steps: TestStep[];
  error?: TestError;
  start: number;
  end: number;
}

export interface TestAnnotation {
  type: string;
  description?: string;
}

export interface TestStep {
  id: string;
  title: string;
  duration: number;
  status: 'passed' | 'failed' | 'skipped';
  start: number;
  end: number;
  attachments?: Attachment[];
  steps?: TestStep[];
  error?: TestError;
}

export interface Attachment {
  name: string;
  contentType: string;
  path?: string;
  body?: string;
}

export interface TestError {
  message: string;
  stack?: string;
  location?: {
    file: string;
    line: number;
    column: number;
  };
}

export interface TimelineItem {
  id: string;
  title: string;
  start: number;
  end: number;
  duration: number;
  status: 'passed' | 'failed' | 'skipped' | 'timedOut';
  projectName: string;
}