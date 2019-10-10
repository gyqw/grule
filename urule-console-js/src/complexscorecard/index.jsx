import React from 'react';
import ReactDOM from 'react-dom';
import KnowledgeTreeDialog from "../components/dialog/component/KnowledgeTreeDialog.jsx";

$(document).ready(function () {
    ReactDOM.render(
        <div>
            <KnowledgeTreeDialog/>
        </div>,
        document.getElementById("dialogContainer")
    );
});

