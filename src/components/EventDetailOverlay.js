import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this._handleEscDown);
        document.addEventListener('click', this._handleOutsideClick);
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', this._handleEscDown);
        document.removeEventListener('click', this._handleOutsideClick);
    }

    // TODO: Support clicking ESC to close it
    _handleEscDown = (e) => {
        let {onClose} = this.props;

        if (e.key === 'Escape') { onClose(); }
    };

    // TODO: Support clicking outside of the overlay to close it
    _handleOutsideClick = (e) => {
        let {onClose} = this.props;
        let clickedValue = e.target.innerText;
        let activeOverlay = this.props.event.title;

        if (clickedValue !== activeOverlay) { onClose(); }
    }

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour);
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

        // TODO: The event label color should match the event color
        // TODO: Add appropriate ARIA tags to overlay/dialog
        return (
            <section className="event-detail-overlay" role="dialog">
                <div className="event-detail-overlay__container" role="document">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                        aria-label="Close"
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className="event-detail-overlay__color"
                            title={`Event label color: ${color}`}
                            color={`${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
