import TestDirector from "test-director";

import test_easeInOutCubic from "./private/easeInOutCubic.test.mjs";
import test_animateScroll from "./public/animateScroll.test.mjs";
import test_scrollToElement from "./public/scrollToElement.test.mjs";

const tests = new TestDirector();

test_easeInOutCubic(tests);
test_animateScroll(tests);
test_scrollToElement(tests);

tests.run();
