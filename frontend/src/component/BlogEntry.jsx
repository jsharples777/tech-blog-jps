import React from "react";
import moment from 'moment';
import debug from 'debug';

import controller from "../Controller";

const beLogger = debug('view:blogentry');

export default class BlogEntry extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {uiConfig, uiPrefs, entry,showCommentsHandler,editEntryHandler,deleteEntryHandler} = this.props;

        if (entry) {
            beLogger(`Entry ${entry.User.id} === ${controller.getLoggedInUserId()}`);

            let editButton;
            let deleteButton;
            if (entry.User.id === controller.getLoggedInUserId()) {
                editButton =
                    <button type="button"
                            className="btn-primary btn-sm rounded p-1 mr-2"
                            entry-id={entry.id} onClick={editEntryHandler}>
                        &nbsp;&nbsp;Edit &nbsp;
                        <i className="fas fa-edit"></i>&nbsp;&nbsp;
                    </button>
                deleteButton =
                    <button type="button"
                            className="btn-warning btn-sm rounded p-1 mr-2"
                            entry-id={entry.id} onClick={deleteEntryHandler}>
                        &nbsp;&nbsp;Delete &nbsp;
                        <i className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                    </button>
            } else {
                editButton = <button type="button" className="btn-outline-secondary btn-sm rounded p-1 mr-2 "
                                     entry-id={entry.id} disabled>&nbsp;&nbsp;Edit &nbsp;<i className="fas fa-edit"></i>&nbsp;&nbsp;
                             </button>
                deleteButton = <button type="button" className="btn-outline-secondary btn-sm rounded p-1 mr-2"
                                       entry-id={entry.id} disabled>&nbsp;&nbsp;Delete &nbsp;
                                 <i className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                               </button>
            }


            return (
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2">
                    <div className={"card"} style={{width: "350px"}}>
                        <div className={"card-header"}>
                            {entry.title}&nbsp;&nbsp;&nbsp;&nbsp;<a className="text-decoration-none">
                            <i className="fas fa-comments text-secondary"  entry-id={entry.id} onClick={showCommentsHandler}></i>&nbsp;&nbsp;
                            <span className="badge badge-pill badge-primary text-right" entry-id={entry.id} onClick={showCommentsHandler}>&nbsp;{entry.Comments.length}&nbsp;</span></a>
                        </div>
                        <div className={"card-body"}>
                            <p className={"card-text"}>{entry.content}</p>
                            {editButton}
                            {deleteButton}
                        </div>
                        <div className={"card-footer text-right text-muted"}>
                            {entry.User.username} on {moment(entry.changedOn, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }

    }

}