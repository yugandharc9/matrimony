import ApplicationBar from '../application-bar/ApplicationBar';
import BottomBar2 from '../application-bar/BottomBar';
import {forwardRef} from 'react';

export const BaseLayout = ({ bottomBar ,children }) => {
    return (<>
        <ApplicationBar />
        <div className="h-screen bg-custom-c1">
                    {children} 
        </div>
        { bottomBar && <BottomBar2/>}
    </>)
}

export const BaseForm = forwardRef(({ handleSubmit,children },ref) => {

    return (<>
        <form ref={ref} onSubmit={handleSubmit} className="flex flex-col bg-custom-c1 items-center justify-between gap-y-5 overflow-auto">
        {children}
        </form>
    </>)
});