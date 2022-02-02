// @ts-check

import TestDirector from "test-director";

import test_animateScroll from "./animateScroll.test.mjs";
import test_easeInOutCubic from "./easeInOutCubic.test.mjs";
import test_scrollToElement from "./scrollToElement.test.mjs";

const tests = new TestDirector();

test_animateScroll(tests);
test_easeInOutCubic(tests);
test_scrollToElement(tests);

tests.run();
