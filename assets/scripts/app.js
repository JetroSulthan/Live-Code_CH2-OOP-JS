// class Tooltip {

// }

// class ProjectItem {
//     constructor(id, updateProjectListsFunction) {
//         this.id = id;
//         this.updateProjectListsFunction = updateProjectListsFunction;
//         this.connectSwitchButton();
//         this.connectMoreInfoButton();
//     }

//     connectMoreInfoButton() {

//     }

//     connectSwitchButton() {
//         const projectItemElement = document.getElementById(this.id);
//         const switchButton =  projectItemElement.querySelector('button:last-of-type');
//         switchButton.addEventListener('click', this.updateProjectListsFunction);
//     };
// }

// class ProjectList {
//     projects = [];

//     constructor(type, switchHandleFunction) {
//         this.type = type;
//         this.switchHandleFunction = switchHandleFunction;
//         const projectItems = document.querySelectorAll(`#${type}-projects li`);
//         // for(let i = 0; i < this.projects.length; i++);
//         for(const projectItem of projectItems) {
//             console.log(projectItem);
//             this.projects.push(new ProjectItem(projectItem.id, this.switchProject.bind(this)));
//         };
//     }

//     setSwitchHandleFunction(switchHandleFunction) {
//         this.switchHandle = switchHandleFunction;
//     }

//     addProject() {
//         console.log(this);
//     }

//     switchProject(projectId) {
//         this.project = this.projects.find(i => i.id === projectId);
//         this.projects.filter((i) => i.id !== projectId);
//         this.addProject();
//         // this.switchHandleFunction(this.projects.find((i) => i.id === projectId));
//         // const projectIndex = this.projects.findIndex((i) => i === projectId); 
//         // this.projects.splice();
//     }
// }

// class App {
//     static init() {
//         const activeProjectList = new ProjectList ("active");
//         const finishProjectList = new ProjectList ("finished");
//         activeProjectList.setSwitchHandleFunction(finishProjectList.addProject.bind());
//     }
// }

// App.init();

// // ProjectList("pass parameter 1");
// // new ProjectList("pass parameter 1");

class Tooltip {}

class ProjectItem {
    constructor(id, updateProjectListsFunction) {
        this.id = id;
        this.updateProjectListsFunction = updateProjectListsFunction;
        this.connectSwitchButton();
        this.connectMoreInfoButton();
    }

    connectMoreInfoButton() {
        // Implement logic for "More Info" button if needed
    }

    connectSwitchButton() {
        const projectItemElement = document.getElementById(this.id);
        const switchButton = projectItemElement.querySelector('button:last-of-type');
        switchButton.addEventListener('click', this.updateProjectListsFunction.bind(null, this.id));
    }
}

class ProjectList {
    projects = [];

    constructor(type, switchHandleFunction) {
        this.type = type;
        this.switchHandleFunction = switchHandleFunction;
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        
        for (const projectItem of projectItems) {
            this.projects.push(new ProjectItem(projectItem.id, this.switchProject.bind(this)));
        }
    }

    setSwitchHandleFunction(switchHandleFunction) {
        this.switchHandleFunction = switchHandleFunction;
    }

    addProject(project) {
        console.log("Adding project:", project);
    }

    switchProject(projectId) {
        const project = this.projects.find(i => i.id === projectId);
        if (!project) {
            return;
        }

        this.projects = this.projects.filter(i => i.id !== projectId);
        this.switchHandleFunction(project);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList("active");
        const finishedProjectList = new ProjectList("finished", activeProjectList.addProject.bind(activeProjectList));

        activeProjectList.setSwitchHandleFunction(finishedProjectList.addProject.bind(finishedProjectList));
    }
}

App.init();
