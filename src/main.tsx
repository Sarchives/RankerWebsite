import { render } from 'preact';
import { AppLoader } from './appLoader';
import './index.css';

render(<AppLoader/>, document.getElementById('app') as HTMLElement)
