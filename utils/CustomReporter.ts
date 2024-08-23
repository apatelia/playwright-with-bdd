import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult } from '@playwright/test/reporter';
import { LOGGER } from './Logger';

export default class CustomReporter implements Reporter {

    private numberOfTestsInSuite: number;

    onBegin (config: FullConfig<{}, {}>, suite: Suite): void {
        this.numberOfTestsInSuite = suite.allTests().length;
        LOGGER.info(`Starting test run with ${this.numberOfTestsInSuite} tests.`);
    }

    onEnd (result: FullResult): void | Promise<void | { status: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined; } | undefined> {
        const durationInSeconds = (result.duration / 1000).toFixed(2);
        LOGGER.info(`Completed test run with ${this.numberOfTestsInSuite} tests in ${durationInSeconds} seconds.`);
    }

    onTestBegin (test: TestCase): void {
        LOGGER.info(`Test Case Started: "${test.title}"`);
    }

    onTestEnd (test: TestCase, result: TestResult): void {
        const durationInSeconds = (result.duration / 1000).toFixed(2);
        LOGGER.info(`Test Case Completed: "${test.title}" : [${result.status}] [${durationInSeconds} seconds]`);

        if (result.status !== 'passed' && result.status !== 'failed') {
            LOGGER.error(`${test.title  } => ${  result.error?.message}`);
        }

        if (result.status === 'failed') {
            LOGGER.error( 'FAILED => ' + test.title);
            LOGGER.error(result.error?.stack);
        }
    }

    onStdOut (chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void {
        LOGGER.info(chunk.toString().trim());
    }

    onStdErr (chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void {
        LOGGER.error(chunk.toString().trim());
    }

    onError (error: TestError): void {
        LOGGER.error(error.stack);
    }
}
