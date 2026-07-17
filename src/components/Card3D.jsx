import React, { useRef, useCallback } from 'react';

/**
 * Card3D — CSS-variable spotlight card with 3D perspective tilt
 *
 * Updates --rx, --ry (rotation) and --mx, --my (spotlight position)
 * CSS custom properties directly on the element.
 * ZERO layout reflow — only transform and custom properties change.
 * GPU composited. ~60fps even on mid-range devices.
 *
 * @param {string}  className   - Additional class names
 * @param {number}  maxTilt     - Max rotation in degrees (default 12)
 * @param {boolean} inner3D     - Wrap children in translateZ inner div
 * @param {object}  style       - Extra inline styles
 * @param {string}  as          - Element tag (default 'div')
 */
const Card3D = ({
    children,
    className = '',
    maxTilt = 12,
    inner3D = true,
    style = {},
    as: Tag = 'div',
    ...rest
}) => {
    const cardRef = useRef(null);
    const rafRef  = useRef(null);
    const isOver  = useRef(false);

    const onMouseMove = useCallback((e) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
            const card = cardRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x    = e.clientX - rect.left;
            const y    = e.clientY - rect.top;
            const cx   = rect.width  / 2;
            const cy   = rect.height / 2;

            // Rotation: negate so movement feels natural (tilt toward cursor)
            const ry =  ((x - cx) / cx) * maxTilt;
            const rx = -((y - cy) / cy) * maxTilt;

            // Spotlight position as percentages
            const mx = (x / rect.width)  * 100;
            const my = (y / rect.height) * 100;

            card.style.setProperty('--rx', `${rx}deg`);
            card.style.setProperty('--ry', `${ry}deg`);
            card.style.setProperty('--mx', `${mx}%`);
            card.style.setProperty('--my', `${my}%`);

            // Remove reset class when actively moving
            card.classList.remove('card-reset');
        });
    }, [maxTilt]);

    const onMouseEnter = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        isOver.current = true;
        card.classList.remove('card-reset');
    }, []);

    const onMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        isOver.current = false;

        // Add reset class for smooth spring-back animation
        card.classList.add('card-reset');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
    }, []);

    return (
        <Tag
            ref={cardRef}
            className={`card-3d ${className}`}
            style={style}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...rest}
        >
            {inner3D
                ? <div className="card-3d-inner">{children}</div>
                : children
            }
        </Tag>
    );
};

export default Card3D;
