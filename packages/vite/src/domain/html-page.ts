import {writeFileSync,getPath, commonContainer } from "@tezjs/common"
import { minify } from 'html-minifier';
import { indexTemplate } from "../const/index.template";
import getUrl from "../functions/get-url";
import { Seo } from "./seo";

export class HtmlPage extends Seo {
    constructor(route: {name:string,path:string,fPath:string}){
        super(route);
        route.path = getUrl(route.path)
    }

    createPage(inlineCode?:{js:{[key:string]:string},css:{[key:string]:string}}) {
        return this.buildHtml();
    }

    buildHtml(){
        this.buildElements();
        var html = commonContainer.buildOptions.commandName === "dev"? indexTemplate(<Seo>this) :  minify(indexTemplate(<Seo>this),{minifyJS:true,collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true});
        if(commonContainer.buildOptions.commandName === "build"){
            let filePath = getPath([this.commonPath.rootPath,'dist',this.route.path],true);
            filePath = getPath([filePath,"index.html"]);
            writeFileSync(filePath,html,true)
        }
        return html
    }
}