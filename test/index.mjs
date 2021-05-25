import TestDirector from 'test-director';
import test_bundle from './bundle.test.mjs';
import test_easeInOutCubic from './private/easeInOutCubic.test.mjs';

const tests = new TestDirector();

test_easeInOutCubic(tests);
test_bundle(tests);

tests.run();
