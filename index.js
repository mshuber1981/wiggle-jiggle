#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    "who wants to be a JavaScript millionaire? \n"
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`
        ${chalk.bgBlue("How to play")}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed("killed")}.
        So get all the questions right...

        `);
};
const askName = async () => {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "what is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
};
const handleAnswer = async (isCorrect) => {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's a legit answer.`,
    });
    await sleep();
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
};
const question1 = async () => {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on \n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17, 1996",
    ],
  });

  return handleAnswer(answers.question_1 === "Dec 4th, 1995");
};
const winner = () => {
  console.clear();
  const msg = `Congrats, ${playerName}! \n $1,000,000`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

await welcome();
await askName();
await question1();
winner();
