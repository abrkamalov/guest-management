export const ROUTES = {
    HOME: '/',
    ADD_GUEST: '/add',
    GUEST_DETAIL: '/guest/:id',
};

export const PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

export const ERROR_MESSAGES = {
    EMPTY_NAME: 'Name field cannot be empty.',
    CONTACT_REQUIRED: 'At least one contact method (phone or email) is required.',
    INVALID_PHONE: 'Invalid phone number. Must be in E.164 format (e.g., +1234567890).',
    EMPTY_EMAIL: 'Email field cannot be empty.',
    INVALID_EMAIL: 'Invalid email format. Must contain a single "@" with at least one character on either side.',
};

export const COLORS = {
    PRIMARY: '#2563eb',
    PRIMARY_DARK: '#1d4ed8',
    SECONDARY: '#e5e7eb',
    SECONDARY_DARK: '#d1d5db',
    DANGER: '#dc2626',
    DANGER_DARK: '#b91c1c',
    TEXT_PRIMARY: '#374151',
    TEXT_SECONDARY: '#6b7280',
    BACKGROUND: '#f9f9f9',
    WHITE: '#ffffff',
};

export const FONT_FAMILY = 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';

export const SIDEBAR_WIDTHS = {
    EXPANDED: '16rem',
    COLLAPSED: '5rem',
};
