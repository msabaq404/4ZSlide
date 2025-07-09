function makeDraggable(element, updateFunc) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    // Start drag
    const dragStart = (x, y) => {
        isDragging = true;
        startX = x;
        startY = y;
        const rect = element.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        // console.log(`Drag started at (${startX}, ${startY})`, `${startLeft} ${startTop}`);
    };

    // During drag
    const dragMove = (x, y) => {
        if (!isDragging) return;
        const deltaX = x - startX;
        const deltaY = y - startY;
        element.style.left = `${deltaX}px`;
        element.style.top = `${deltaY}px`;
        updateFunc();
    };

    // End drag
    const dragEnd = () => {
        isDragging = false;
    };

    // Mouse
    element.addEventListener("mousedown", (e) => {e.preventDefault(); dragStart(e.clientX, e.clientY)});
    element.addEventListener("mousemove", (e) => {e.preventDefault(); dragMove(e.clientX, e.clientY)});
    document.addEventListener("mouseup", dragEnd);

    // Touch
    element.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        dragStart(touch.clientX, touch.clientY);
    });
    element.addEventListener(
        "touchmove",
        (e) => {
            const touch = e.touches[0];
            dragMove(touch.clientX, touch.clientY);
        },
        { passive: false }
    ); // Prevent scroll
    document.addEventListener("touchend", dragEnd);
}

let shouldSwipe = true;

function setShouldSwipe(newShouldSwipe) {
    shouldSwipe = newShouldSwipe;
}

function swipe(element, left, right) {
    let startX = 0;
    let isSwiping = false;
    const swipeThreshold = 50; // Min pixels to be a swipe

    const onSwipeStart = (x) => {
        if (!shouldSwipe) return; 

        isSwiping = true;
        startX = x;
    };

    const onSwipeEnd = (x) => {
        if (!shouldSwipe) return; 

        if (!isSwiping) return;

        const deltaX = x - startX;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                if (right) right();
            } else {
                if (left) left();
            }
        }
        isSwiping = false;
    };

    // Mouse events
    element.addEventListener("mousedown", (e) => {
        e.preventDefault();
        onSwipeStart(e.clientX);
    });

    document.addEventListener("mouseup", (e) => {
        if (isSwiping) {
            onSwipeEnd(e.clientX);
        }
    });

    // Touch events
    element.addEventListener("touchstart", (e) => {
        e.preventDefault();
        onSwipeStart(e.touches[0].clientX);
    }, { passive: false });

    document.addEventListener("touchend", (e) => {
        if (isSwiping) {
            onSwipeEnd(e.changedTouches[0].clientX);
        }
    });
}

