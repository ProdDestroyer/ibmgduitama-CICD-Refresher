const { exec } = require("child_process");
const fs = require("fs");

const backRefresh = async (req, res) => {
        const scriptPath = "./scripts/back_refresh.sh";
        const logFilePath = "../back_refresh.log";

        fs.appendFileSync(
                logFilePath,
                `\n=== Deployment triggered at ${new Date().toISOString()} ===\n`
        );

        const scriptExecution = exec(`bash ${scriptPath} >> ${logFilePath} 2>&1`);

        scriptExecution.on("exit", (code) => {
                fs.appendFileSync(logFilePath, `Script exited with code ${code}\n`);
                console.log(`Script exited with code ${code}`);
        });

        scriptExecution.on("error", (error) => {
                fs.appendFileSync(logFilePath, `Error: ${error}\n`);
                console.error(error);
        });

        res.status(200).send("Deployment started");
};

const frontRefresh = async (req, res) => {
        const scriptPath = "./scripts/front_refresh.sh";
        const logFilePath = "../front_refresh.log";

        fs.appendFileSync(
                logFilePath,
                `\n=== Deployment triggered at ${new Date().toISOString()} ===\n`
        );

        const scriptExecution = exec(`bash ${scriptPath} >> ${logFilePath} 2>&1`);

        scriptExecution.on("exit", (code) => {
                fs.appendFileSync(logFilePath, `Script exited with code ${code}\n`);
                console.log(`Script exited with code ${code}`);
        });

        scriptExecution.on("error", (error) => {
                fs.appendFileSync(logFilePath, `Error: ${error}\n`);
                console.error(error);
        });

        res.status(200).send("Deployment started");
};

module.exports = {
        backRefresh,
        frontRefresh
}