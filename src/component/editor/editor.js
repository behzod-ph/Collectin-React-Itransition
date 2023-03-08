import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {modules, formats} from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import {LANGUAGE} from "../../util/constants";
import {ENG} from "../../util/constants/language";

export const Editor = ({description, sedDescription}) => {

    const lan = localStorage.getItem(LANGUAGE)

    return (
        <div className="text-editor">
            <EditorToolbar/>
            <ReactQuill
                theme="snow"
                value={description}
                onChange={(content) => sedDescription(content)}
                placeholder={lan===ENG?"Write description about collection...":'Напишите описание коллекции...'}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default Editor;