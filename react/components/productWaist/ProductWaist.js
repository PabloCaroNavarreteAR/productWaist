import React, {Fragment, useContext, useState} from 'react';
import ComponentChecker from '../ComponentChecker/index';
import { ProductContext } from 'vtex.product-context';
import { Modal, ButtonPlain } from 'vtex.styleguide'
import {useCssHandles} from 'vtex.css-handles'
import style from './style.css'
import { isExportSpecifier } from 'typescript';


const ProductWaist = (props) => {
    const CSS_HANDLES = ['ProductWaist'];
    const handles = useCssHandles(CSS_HANDLES);
    const {link, text} = props;
    const valuesFromContext = useContext(ProductContext);
    let product = valuesFromContext.product;
    let productProp = product.properties;
    let waist = productProp?.map(propertie => propertie?.name?.includes("Tabla") && propertie);
    let waistName = waist?.map(tabla => tabla.values)
    let tabla = waistName.filter(item => item !== undefined)
    let tablaFinal = tabla[0][0].split(' ').join('')
    const URL = 'https://mimoar.vteximg.com.br/arquivos/';
    let width = window.innerWidth;
    const [isOpen, setOpen] = useState(false)
    //si el producto tiene talle unico, no muestro el componente
    let especification = product.skuSpecifications?.map(item => item)
    let isTalleUnico = especification[1].values.map(item => item.name).includes("Único");
    let version = Math.floor(Math.random(1000,2000) * 6) + 1000;
    return (
        <ComponentChecker>
        {   waist && !isTalleUnico ? 
            <>
            <p className={`${handles['ProductWaist']} ${style.paragraph}`}>{text} <ButtonPlain onClick={() => setOpen(!isOpen)}>{link}</ButtonPlain></p>
            <Modal isOpen={isOpen} onClose={() => setOpen(!isOpen)}>
                <img src={`${URL}tabladetalles_${tablaFinal}${width <= 768 ? `_mobile` : ``}.png?v=${version}`} />
            </Modal>
            </>
            : <Fragment/>
          }  
        </ComponentChecker>
            
    );
}
ProductWaist.getSchema = props => {
    return {
        title: 'Product Waist',
        type: 'object',
        properties: {
            text: {
                title: 'Text you want to show in the text',
                type: 'string',
                default: props.text
            },
            link:{
                title: 'Text you want to show in the link',
                type: 'string',
                default: props.link
            }
        }
        
    }
}
ProductWaist.defaultProps = {
    text: "Las edades son aproximadas, ver",
    link:"tabla de talles"
}
export default ProductWaist;