# Manual Accessibility Verification

1. Open a post containing a gallery and activate an image.
2. Confirm focus moves to the Close button and the page behind the modal cannot receive pointer or keyboard focus.
3. Press Tab and Shift+Tab through Close, Previous image, and Next image; confirm focus wraps within the modal.
4. Press Left Arrow and Right Arrow; confirm the displayed image and its alternative text both change.
5. Swipe in both directions on a touch device; confirm image navigation still works.
6. Press Escape and activate Close; confirm each closes the modal and restores focus to the image link or image that opened it.
7. With a screen reader, confirm the overlay is announced as a modal dialog named "Image lightbox" and all three controls have labels.
8. Close and reopen the lightbox; confirm background interaction and page scrolling are restored after every close.
