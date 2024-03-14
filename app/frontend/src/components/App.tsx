import * as React from 'react'
import HomePage from './HomePage';

interface Props {

}

interface State {

}


export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>
        )
    }
}