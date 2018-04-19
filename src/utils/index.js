import {MILLISECONDS_DAY} from '../utils/constants';

const _DAY_DISPLAY_MAP = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Given a list of events and a date, filter the events down to those that
 * fall on the same day as the date
 * @param {array} events - List of event objects
 * @param {Date} timestamp - The timestamp representing the day to match
 * @returns {array}
 */
export const filterEventsByDay = (events, timestamp) => (
    events.filter(({start}) => (
        new Date(timestamp)).getDay() === new Date(start).getDay()
    )
);

/**
 * Given a list of events and an hour number, filter the events down to those that
 * start on the specified hour
 * @param {array} events - List of event objects
 * @param {number} hour - The hour to match (0 - 23)
 * @param {array}
 * @returns {array}
 */
export const filterEventsByHour = (events, hour) => (
    events.filter(({start}) => (
        new Date(start)).getHours() === hour
    )
);

/**
 * Given a numerical timestamp, returns the formatted date string w/o time component
 * @param {number} timestamp - The date to format
 * @returns {string} The formatted date
 */
export const getDisplayDate = (timestamp) => {
    let date = new Date(timestamp);
    let words = date.toString().split(' ');

    // TODO: Format the date like: "Tuesday, April 11, 2017"
    return `${_DAY_DISPLAY_MAP[date.getDay()]}, ${words[1]} ${words[2]}, ${words[3]}`;
};

/**
 * Given an hour number, returns a display string version
 * @param {number} hour - The hour
 * @returns {string}
 */
// TODO: Implement using a more programmatic approach instead of map
export const getDisplayHour = (hour) => {
    if (hour === 0) { return `12AM`; }
    return hour <= 12 ? `${hour}AM` : `${hour - 12}PM`;
};

/**
 * Given a list of events, returns the event object whose id matches the specified eventId
 * @param {array} events - List of event objects
 * @param {number} eventId - ID of event to find
 * @returns {object}
 */
export const getEventFromEvents = (events, eventId) => (
    events.find(({id}) => id === eventId)
);
