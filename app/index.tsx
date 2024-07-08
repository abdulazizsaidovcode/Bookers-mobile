import React from 'react';
import TabLayout from './(tabs)/_layout';
import RemindAboutAppointment from './(notifications)/(pages)/remind-about-appointment';
import CancelRecording from './(notifications)/(pages)/cancel-recording';
import MyServices from './(standart)/(services)/(myServices)/myServices';

const Index: React.FC = () => {
    return (
        // <TabLayout />
        <MyServices/>
    )
}
export default Index;