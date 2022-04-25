export default abstract class ToolAbstract {
    
    protected resultPath = __dirname + "/../results/";

    public abstract execute(...args: any) : void;
}