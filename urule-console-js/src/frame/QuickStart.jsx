/**
 * Created by Jacky.gao on 2016/8/10.
 */
import React, {Component} from 'react';

export default class QuickStart extends Component {
    render() {
        return (
            <div style={{fontSize: '14px', fontFamily: 'Microsoft YaHei UI, Microsoft YaHei', margin: '10px'}}><h1
                style={{textAlign: "center"}}>欢迎使用决策系统</h1>
                <table className="table table-bordered" style={{marginTop: '20px'}}>
                    <thead>
                    <tr style={{
                        background: '#fdfdfd',
                        textAlign: "left",
                        verticalAlign: 'middle',
                        fontSize: '18px',
                        color: '#7b7a7a'
                    }}>
                        <td colSpan="3">主要功能</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{fontSize: '14pt', background: '#98908d', color: '#fff'}}>
                        <td>特性</td>
                        <td>当前版本</td>
                    </tr>
                    <tr>
                        <td>向导式决策集</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize: '20px', color: 'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>脚本式决策集</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize: '20px', color: 'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>决策树</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize: '20px', color: 'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>决策流</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize: '20px', color: 'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>决策表</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize: '20px', color: 'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>交叉决策表</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize: '20px', color: 'green'}}></i></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};
