import ToolAbstract from "../ToolAbstract";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import Logger from "../Logger";

export type Format = "json-all" | "json-per-planet" | "md-acc-util";

// Variants :
const planets = ["p1", "p2", "p3", "p4", "p5"];

const aliens = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"];
const textures = ["t1", "t2", "t3", "t4", "t5"];

const accessories = [
    "acc1", "acc2", "acc3", "acc4", "acc5", "acc6", "acc7", "acc8", "acc9", "acc10", 
    "acc11", "acc12", "acc13", "acc14", "acc15", "acc16", "acc17", "acc18", "acc19", "acc20"
];

export default class NFTPossibilities extends ToolAbstract {

    private possibilitiesResultPath = this.resultPath + "possibilities/";

    public execute(type: Format) : void {
        if(!existsSync(this.possibilitiesResultPath)) mkdirSync(this.possibilitiesResultPath);

        switch(type){
            case "json-all":
                writeFileSync(
                    this.possibilitiesResultPath + type + ".json", 
                    JSON.stringify(this.getAllPossibilities(), null, 2)
                );
            break;

            case "json-per-planet":
                const possibilities: { [planetName: string]: string[] } = {};

                this.getAllPossibilities().forEach(element => {
                    const planet = element.substring(0, 2);

                    if(!possibilities[planet]) possibilities[planet] = [];

                    possibilities[planet].push(element);
                });

                writeFileSync(
                    this.possibilitiesResultPath + type + ".json", 
                    JSON.stringify(possibilities, null, 2)
                );
            break;

            case "md-acc-util":
                let markdownSource: string = "";

                planets.forEach(planet => {
                    markdownSource += "# Planet " + planet[1] + "\n";

                    aliens.forEach(alien => {
                        markdownSource += "## Alien " + alien[1] + "\n";

                        accessories.forEach(accessories => {
                            markdownSource += "- [ ] " + accessories.toUpperCase() + "\n";
                        });
                    });
                });

                writeFileSync(this.possibilitiesResultPath + type + ".md", markdownSource);
            break;
        }

        Logger.success("File generated in /results/possibilities folder");
    }

    private getAllPossibilities() : string[] {
        const possibilities: string[] = [];

        planets.forEach(planet => {
            aliens.forEach(alien => {
                textures.forEach(texture => {
                    accessories.forEach(accessories => {
                        possibilities.push(planet + "-" + alien + "-" + texture + "-" + accessories);
                    });
                });
            });
        });

        return possibilities;
    }
}