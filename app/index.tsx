import React from 'react';
import TabLayout from './(tabs)/_layout';
import RemindAboutAppointment from './(notifications)/(pages)/remind-about-appointment';
import CancelRecording from './(notifications)/(pages)/cancel-recording';
import OnlineBooking from './(standart)/(onlineBooking)/onlineBooking';

const Index: React.FC = () => {
    return (
        <TabLayout />
    )
}
export default Index;