// @flow

module.exports = {
    COLOR: {
        WHITE: '#FFFFFF',
        GREEN: 'green',
        RED: '#FF0000',
        PRIMARY: '#144952',
        DARK_PRIMARY:'#103A41',
        ACCENT: '#38AB57',
        DIVIDER: 'rgba(0,0,0,0.12)',
        BLACK_37: 'rgba(0,0,0,0.37)',
        TRANSPARENT: 'transparent',
        DARK_CYAN: '#009688',
        BLACK_54: 'rgba(0,0,0,0.54)',
        BLACK_87: 'rgba(0,0,0,0.87)',
        SEARCH_CARD: '#FAFAFA',
        APP_THEME: '#F1F3F4',
        LOADER_TRANSPARENT_BACKGROUND: 'rgba(0, 0, 0, 0.6)'
    },
    STRINGS: {
        TRACK_SHIPMENT: 'Track Shipment',
        REACHED_AT: 'Reached At',
        AWB: 'Awb',
        CLIENT: 'Client',
        ORIGIN: 'Origin',
        SEARCH_PLACEHOLDER: 'Enter Tracking Number',
        DESTINATION: 'Destination',
        UPDATED_AT: 'Updated At',
        DESCRIPTION: 'Description',
        LOCATION: 'Location',
        SEARCH: 'SEARCH',
        NETWORK_ERROR_TITLE: 'Slow or no internet connection',
        NETWORK_ERROR_MESSAGE: 'Please wait & try again after a moment',
        TRACKING_REQUEST_ERROR: 'Failed to get tracking details',
        INVALID_SHIPMENT: 'NuvoEx does not recognize any \n shipment with that Tracking Number',
        NOT_FOUND: 'Shipment Not Found!'
    },
    SIZE: {
        DEFAULT_MARGIN: 16,
        STANDARD_PADDING: 16,
        TOOLBAR_HT: 56,
        MEDIUM_TEXT: 16,
        LARGE_TEXT: 17,
        DIVIDER_HT: 2,
        ICON: 24,
        SMALL_TEXT: 12,
        CARD_MARGIN: 8,
        INVALID_MARGIN_TOP: 54
    },
    ICONS: {
        NUVOEX: require('../res/icons/nuvoex_logo.png')
    }
};
