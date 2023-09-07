const { execSync } = require('child_process');

// Command to check if Cargo is installed
const isCargoInstalled = () => {
    try {
        execSync('cargo --version');
        return true;
    } catch (error) {
        return false;
    }
};

// Command to install Cargo
const installCargo = () => {
    execSync('curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh');
};

// Command to create a new Cargo project
const createCargoProject = (projectName) => {
    execSync(`mkdir ${projectName}`);
    execSync(`cd ${projectName} && cargo init`);
};

// Run Hello World Code!!
const runCode = (projectName) => {
    execSync(`cd ${projectName} && cargo run`, { stdio: 'inherit' });
}
// Function to validate if the project name is in snake_case
const isValidSnakeCase = (name) => {
    const snakeCaseRegex = /^[a-z0-9_]+$/;
    return snakeCaseRegex.test(name);
};

const notStartWithNum = (projectName) => {
    const firstChar = projectName.charAt(0);
    return isNaN(firstChar);
}

// Main function
const main = (projectName) => {
    if (!notStartWithNum(projectName)) {
        console.error('Project name should not start with a numeric value.');
        return;
    }
    if (!isValidSnakeCase(projectName)) {
        console.error('Project name should be in snake_case format (lowercase with underscores), e.g. amazing_rust');
        return;
    }

    if (!isCargoInstalled()) {
        console.log('Cargo is not installed. Installing...');
        installCargo();
    } else if (isCargoInstalled) {
        console.log("whoohoo, Cargo is already installed!!");
    }

    console.log(`Creating a new Cargo project named "${projectName}"...`);
    createCargoProject(projectName);
    console.log("Project Created! \n Running the project");

    runCode(projectName);

    console.log('Happy Hacking!! ✨');
};

// Get the user-defined project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
    console.error('Please provide a project name.');
} else {
    main(projectName);
}
