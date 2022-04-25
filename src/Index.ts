import prompts from "prompts";
import NFTPossibilities, { Format } from "./tools/NFTPossibilities";

interface Tool {
    title: string;
    description: string;
    
    value: string;

    select: CallableFunction;
}

const tools: Tool[] = [
    {
        title: "NFT Possibilities",
        description: "Generate differents format of list of all possible combinations",
        value: "nft_possibilities",
        select: () => {
            const formats: Format[] = ["json-all", "json-per-planet", "md-acc-util"]; 

            prompts({
                type: "select",
                name: "value",
                message: "Select the format",
                choices: formats.map(format => ({
                    title: format,
                    value: format
                }))
            }).then(response => (new NFTPossibilities).execute(response.value));
        }
    },
    {
        title: "NFT Publisher",
        description: "Publish NFT on the blockchain",
        value: "publisher",
        select: () => {}
    },
    {
        title: "ThreeJS NFT Builder",
        description: "Build and render images with ThreeJS all NFT combinations",
        value: "threejs_builder",
        select: () => {}
    }
]

prompts({
    type: "select",
    name: "value",
    message: "Select the tool",
    choices: [...tools]
}).then(response => tools.find(tool => tool.value === response.value)?.select());