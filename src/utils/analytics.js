/**
 * Google Analytics 4 (GA4) Utility
 * Measurement ID: G-5J1YS5GS5T
 *
 * Provides safe, ad-blocker resilient wrappers for tracking events,
 * clicks, outbound navigation, section impressions, and conversions.
 */

export const GA_MEASUREMENT_ID = 'G-5J1YS5GS5T';

/**
 * Safely trigger custom Google Analytics events
 * @param {string} eventName - GA4 event name (e.g. 'click', 'form_submission', 'view_project')
 * @param {object} params - Key-value metadata parameters
 */
export const trackEvent = (eventName, params = {}) => {
    try {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    } catch (err) {
        // Fail silently so analytics never impacts UX
        console.debug('[GA] Event tracking suppressed:', err);
    }
};

/**
 * Track user CTA or button clicks
 * @param {string} label - Button name or action description
 * @param {string} location - Section or component where click occurred
 * @param {object} extra - Additional parameters
 */
export const trackClick = (label, location = 'general', extra = {}) => {
    trackEvent('cta_click', {
        button_name: label,
        click_location: location,
        ...extra
    });
};

/**
 * Track outbound external links (LinkedIn, GitHub, External Demos)
 * @param {string} url - External destination URL
 * @param {string} label - Anchor or platform name
 */
export const trackOutbound = (url, label = '') => {
    trackEvent('outbound_click', {
        link_url: url,
        link_domain: getHostname(url),
        link_label: label,
        transport_type: 'beacon'
    });
};

/**
 * Track section navigation / views in Single Page Apps
 * @param {string} sectionName - Name of the section (e.g. 'projects', 'about', 'experience')
 */
export const trackSectionView = (sectionName) => {
    trackEvent('section_view', {
        section_name: sectionName
    });
};

/**
 * Track contact form submission attempts and results
 * @param {string} formName - Name of the form (e.g. 'contact_form')
 * @param {'success' | 'error'} status - Outcome status
 * @param {object} extra - Extra context
 */
export const trackFormSubmit = (formName, status, extra = {}) => {
    trackEvent('form_submission', {
        form_name: formName,
        status: status,
        ...extra
    });
};

/**
 * Helper to safely extract domain name from a URL
 */
function getHostname(url) {
    try {
        if (!url) return '';
        if (url.startsWith('mailto:')) return 'email';
        if (url.startsWith('tel:')) return 'phone';
        const parsed = new URL(url);
        return parsed.hostname;
    } catch {
        return url;
    }
}
