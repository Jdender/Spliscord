import { Application, Controller } from 'stimulus';

class Topbar extends Controller {
}

const app = Application.start();
app.register('topbar', Topbar);
