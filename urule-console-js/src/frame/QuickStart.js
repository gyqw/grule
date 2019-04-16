/**
 * Created by Jacky.gao on 2016/8/10.
 */
import React,{Component,PropTypes} from 'react';
export default class QuickStart extends Component{
    render(){
        return (
            <div style={{fontSize: '14px',fontFamily: 'Microsoft YaHei UI, Microsoft YaHei',margin:'10px'}}><h1 style={{textAlign:"center"}}>欢迎使用决策系统</h1>
                <table className="table table-bordered" style={{marginTop:'20px'}}>
                    <thead>
                    <tr style={{background:'#fdfdfd',textAlign:"left",verticalAlign:'middle',fontSize:'18px',color:'#7b7a7a'}}><td colSpan="3">主要功能</td></tr>
                    </thead>
                    <tbody>
                    <tr style={{fontSize:'14pt',background:'#98908d',color:'#fff'}}>
                        <td style={{width:'200px'}}>特性</td>
                        <td>当前版本</td>
                    </tr>
                    <tr>
                        <td>向导式决策集</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize:'20px',color:'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>脚本式决策集</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize:'20px',color:'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>决策树</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize:'20px',color:'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>决策流</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize:'20px',color:'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>决策表</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize:'20px',color:'green'}}></i></td>
                    </tr>
                    <tr>
                        <td>交叉决策表</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>文件名、项目名重构</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>参数名、变量常量名重构</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>Excel决策表导入</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>规则集模版保存与加载</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>循环规则多循环单元支持</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>导入项目自动重命名功能</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>性能调优</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>更为完善的文件读写权限控制</td>
                        <td><i className="glyphicon glyphicon-remove" style={{fontSize:'20px',color:'red'}}></i></td>
                    </tr>
                    <tr>
                        <td>技术支持</td>
                        <td><i className="glyphicon glyphicon-ok" style={{fontSize:'20px',color:'green'}}></i></td>
                    </tr>
                    </tbody>
                </table>
        </div>
        );
    }
};
