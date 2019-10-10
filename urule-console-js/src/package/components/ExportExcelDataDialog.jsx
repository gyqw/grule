/**
 * Created by jacky on 2016/6/24.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CommonDialog from '../../components/dialog/component/CommonDialog.jsx';
import * as event from '../event.js';

export default class ExportExcelDataDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {files: ''};
    }

    componentDidMount() {
        event.eventEmitter.on(event.OPEN_EXPORT_EXCEL_DIALOG, (files) => {
            $(ReactDOM.findDOMNode(this)).modal('show');
            this.setState({files});

            $('.datepicker').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true
            });
        });
        event.eventEmitter.on(event.HIDE_EXPORT_EXCEL_DIALOG, () => {
            $(ReactDOM.findDOMNode(this)).modal('hide');
        });
    }

    comonentWillUnmount() {
        event.eventEmitter.removeAllListeners(event.OPEN_EXPORT_EXCEL_DIALOG);
        event.eventEmitter.removeAllListeners(event.HIDE_EXPORT_EXCEL_DIALOG);
    }

    render() {
        const formId = 'export_excel_form';
        const body = (
            <div>
                <form id={formId} method="post" action={window._server + '/packageeditor/exportExcelData'}>
                    <div>
                        <div className="form-group">
                            <label>开始时间:</label>
                            <input type="text" className="form-control datepicker" name="startTime" autoComplete="off"/>
                        </div>
                        <div className="form-group">
                            <label>结束时间:</label>
                            <input type="text" className="form-control datepicker" name="endTime" autoComplete="off"/>
                        </div>
                    </div>
                </form>
            </div>
        );
        const buttons = [
            {
                name: '导出',
                className: 'btn btn-primary',
                icon: 'glyphicon glyphicon-cloud-download',
                click: function () {
                    document.getElementById(formId).submit();
                }
            }
        ];
        return (<CommonDialog title="导出Excel" body={body} buttons={buttons}/>);
    }
}