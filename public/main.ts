import { Application, Controller } from 'stimulus';

class Hello extends Controller {

    public static targets = [ 'name' ];

    private nameTarget: HTMLInputElement;

    public greet() {
      console.log(`Hello, ${this.name}!`); // tslint:disable-line:no-console
    }

    private get name() {
      return this.nameTarget.value;
    }
}

const app = Application.start();
app.register('hello', Hello);
