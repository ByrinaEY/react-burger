import styles from './icon-link.module.css';
function IconLink ({isActive, iconName: Icon, children, href}){
    return(
        <a href={href} className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}>
        <Icon type={isActive ? "primary" : "secondary"}/>
        <span className={`text text_type_main-default  ml-2 ${isActive ? "text_color_primary" : "text_color_inactive"} ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
        {children}
        </span>
        </a>
    )
}

export default IconLink;

