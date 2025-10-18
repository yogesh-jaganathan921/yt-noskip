const progressBar = document.querySelector('.ytp-progress-bar');
const scrubber = document.querySelector('.ytp-scrubber-button');

if (progressBar) {
    progressBar.style.pointerEvents = 'none';
    progressBar.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        e.preventDefault();
    }, true);
}

if (scrubber) {
    scrubber.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        e.preventDefault();
    }, true);
}

let isCommenting = false;

function attachCommentListeners() {
    const commentBox = document.querySelector('ytd-comment-simplebox-renderer #contenteditable-root');
    const commentButton = document.querySelector('ytd-comment-simplebox-renderer #submit-button');
    const cancelButton = document.querySelector('ytd-comment-simplebox-renderer #cancel-button');


    if (commentBox && !commentBox.dataset.listenerAdded) {
        commentBox.addEventListener('focus', () => isCommenting = true);
        commentBox.addEventListener('mousedown', () => {
            isCommenting = true;
        });
        commentBox.addEventListener('blur', () => isCommenting = false);
        commentBox.dataset.listenerAdded = 'true';
    }


    if (commentButton && !commentButton.dataset.listenerAdded) {
        commentButton.addEventListener('click', () => isCommenting = false);
        commentButton.dataset.listenerAdded = 'true';
    }

    if (cancelButton && !cancelButton.dataset.listenerAdded) {
        cancelButton.addEventListener('click', () => isCommenting = false);
        cancelButton.dataset.listenerAdded = 'true';
    }
}

attachCommentListeners();

new MutationObserver(() => attachCommentListeners())
    .observe(document.body, { childList: true, subtree: true });


addEventListener('keydown', (e) => {
    if (!isCommenting) {
        const skipKeys = ['arrowright', 'l'];
        if (skipKeys.includes(e.key.toLowerCase())) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }
}, true);