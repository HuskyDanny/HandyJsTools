const { AWTLogManager, AWTEventProperties, AWTPiiKind, AWTEventsDroppedReason } = require('@aria/webjs-sdk');

const projectKey = 's';

const defaultLogger = AWTLogManager.initialize(projectKey);

AWTLogManager.addNotificationListener({
    eventsSent: (events) => {
        console.log("Number of Events Sent: " + events.length)
    },
    eventsDropped: (events, reason) => {
        // You can check AWTEventsDroppedReason to see what caused events to be dropped.
        console.log("Number of Events Dropped: " + events.length)
        console.log(reason);
    }
});


function sendEvents() {
    var eventProperties = new AWTEventProperties();

    eventProperties.setName('testing');
    eventProperties.setProperty('Button_Clicked', 'SendEvents');
    eventProperties.setPropertyWithPii('Page_Title', 'ARIA JavaScript Library Sample', AWTPiiKind.GenericData);

    defaultLogger.logEvent(eventProperties);
}

sendEvents();

AWTLogManager.flushAndTeardown() 