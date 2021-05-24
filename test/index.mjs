import TestDirector from 'test-director';
import testBundle from './bundle.test.mjs';
import testEaseInOutCubic from './private/easeInOutCubic.test.mjs';

const tests = new TestDirector();

testEaseInOutCubic(tests);
testBundle(tests);

tests.run();
