import {Readable} from "stream";
import "./number";
import "./string";
import "./array";
import {DateMask} from "./date";

export enum FilterTypes {
    EMAIL,
    INT,
    FLOAT
}
export enum ClearTypes {
    STRING,
    EMAIL,
    INT,
    FLOAT,
    SEO_URL,
    ALPHABETS
}

class Variable{
    static clear(variable: any, type: ClearTypes = ClearTypes.STRING, clear_html_tags = false) : any {
        variable = (typeof variable != "undefined") ? variable : null;
        if(variable !== null){
            variable = (clear_html_tags) ? Variable.strip_tags(variable) : variable;
            if (isNaN(variable)) {
                variable = variable.toString().trim();
            }
            switch (type){
                case ClearTypes.INT:
                    // @ts-ignore
                    variable = Number.parseInt(Variable.filter_var(variable, FilterTypes.INT));
                    break;
                case ClearTypes.FLOAT:
                    // @ts-ignore
                    variable = Number.parseFloat(Variable.filter_var(variable, FilterTypes.FLOAT));
                    break;
                case ClearTypes.ALPHABETS:
                    variable = variable.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\w ]/g, "");
                    break;
                case ClearTypes.EMAIL:
                    variable = Variable.filter_var(variable, FilterTypes.EMAIL);
                    break;
                case ClearTypes.SEO_URL:
                    variable = this.convert_seo_url(variable);
                    break;
            }
        }

        return variable;
    }

    static clear_all_data(data: object | any, not_column: Array<string> = []) : object | any {
        if(!this.isset(() => data)) return false;

        // @ts-ignore
        for (let [key, _1] of Object.entries(data)) {
            // @ts-ignore
            if (not_column.includes(key)) continue;
            let clear_type = ClearTypes.STRING;
            if(!this.empty(_1)) {
                if(typeof _1 === "object"){ this.clear_all_data(_1); continue; }
                if (!isNaN(Number(_1))){
                    if (Number(_1).isInt()) clear_type = ClearTypes.INT;
                    else if (Number(_1).isFloat()) clear_type = ClearTypes.FLOAT;
                }
            }
            data[key] = this.clear(_1, clear_type, true);
        }

        return data;
    }

    static isset(...variable: any) : boolean{
        let result;
        try{
            for (let i = 0; i < variable.length; i++){
                result = variable[i]();
            }
        }catch (e){
            result = undefined;
        }finally {
            return result !== undefined;
        }
    }
    static isset_default(variable: any, default_value: any) : any{
        return (this.isset(variable)) ? variable() : default_value;
    }

    /**
     * @param _value
     * Checks your entered value Ex: if(_value === case_key)
     * @param _case
     * Usage: { "default": () => any}
     * @returns
     */
    static switch(_value: any, _case: object = { "default":  () => false }) : any {
        let result = null;
        // @ts-ignore
        for (let [key, value] of Object.entries(_case)) {
            if(key === "default" && result === null) {
                result = value();
                continue;
            }else if(_value === key) {
                result = value();
            }
        }
        return result;
    }

    /**
     *
     * @param data
     * @param _function
     * Usage: (key, value) => {}
     */
    static foreach(data: any, _function: Function) {
        // @ts-ignore
        for (let [key, value] of Object.entries(data)) {
            _function(key, value);
        }
    }

    static empty(...variable: any) : boolean{
        for (let i = 0; i < variable.length; i++){
            if(
                !this.isset(() => variable[i]) ||
                variable[i] === null ||
                variable[i].length === 0 ||
                !variable[i].toString().trim()
            ) return true;
        }
        return false;
    }

    static convert_string_to_key(string: string){
        return unescape(encodeURIComponent(this.clear(string.toString(), ClearTypes.SEO_URL)));
    }

    static html_encode(variable: any) : any {
        return escape(variable); //variable.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    }

    static html_decode(variable: any) : any {
        return unescape(variable); //return variable.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll("&#039;", "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    }

    static random(min: number, max: number) : number{
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // @ts-ignore
    static buffer_to_stream(buffer: Buffer | any): Readable {
        // @ts-ignore
        const readable = new Readable()
        readable._read = () => {}
        readable.push(buffer)
        readable.push(null)
        return readable
    }

    private static strip_tags(variable: any) : any{
        variable = variable.toString();
        return variable.replace(/<\/?[^>]+>/gi, '');
    }

    private static filter_var(variable: any, filter_type: FilterTypes) : string {
        let regex;

        // Check Filter Type
        switch(filter_type){
            case FilterTypes.EMAIL:
                regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                break;
            case FilterTypes.INT:
                regex = /([0-9]+)/g;
                break;
            case FilterTypes.FLOAT:
                regex = /[+-]?([0-9]*[.])[0-9]+/g;
        }
        // Check Defined
        let match;
        if ((match = regex.exec(variable)) != null) {
            variable = match[0];
        } else {
            variable = "";
        }

        return variable;
    }

    private static convert_seo_url(variable: any) : string{
        variable = this.html_encode(Variable.strip_tags(variable.toString().toLowerCase().trim()));
        variable = variable.replace("'", '');
        let tr = Array('ş','Ş','ı','I','İ','ğ','Ğ','ü','Ü','ö','Ö','Ç','ç','(',')','/',':',',','!');
        let eng = Array('s','s','i','i','i','g','g','u','u','o','o','c','c','','','_','_','','');
        variable = variable.replaceArray(tr, eng);
        variable = variable.replace(/[^-\w\s]/g, ''); // Remove unneeded characters
        variable = variable.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing spaces
        variable = variable.replace(/[-\s]+/g, '-'); // Convert spaces to hyphens
        variable = variable.toLowerCase(); // Convert to lowercase
        return variable;
    }
}

export {
    DateMask
}

export default Variable;


