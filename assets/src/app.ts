///<reference path="./reference.ts" />

class Launcher {
    
    private gamanager: gamanager.GAManager;

    constructor() {
        this.gamanager = new gamanager.GAManager();
        console.log('Prepared!');
    }
    
    public initialize(): void {
        this.gamanager.initialize();
    }

    

}

window.onload = () => {
    var launcher = new Launcher(),
        button = document.getElementById('auth-button');
        
   button.addEventListener('click',(e) => {
        console.log('Clicked!');
        launcher.initialize();
        
    });
};