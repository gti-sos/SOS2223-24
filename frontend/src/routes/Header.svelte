<script>
    import {Icon,ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle,Nav,NavItem,NavLink,} from "sveltestrap";
</script>

<div>
    <Nav>
        <h2>SOS2223-24 </h2>
        <NavLink href="/"><h6>Inicio</h6> <Icon name="house-fill"/></NavLink>
        <NavItem><ButtonDropdown>
                <DropdownToggle color="" style="font-weight:bold" caret>Front-ends</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Tipos:</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><a href="/agrodata-almeria">agrodata-almeria</a></DropdownItem>
                    <DropdownItem><a href="/agroprices-weekly">agroprices-weekly</a></DropdownItem>
                    <DropdownItem><a href="/provisions-for-the-year-2014">provisions-for-the-year-2014</a></DropdownItem>
                </DropdownMenu>
            </ButtonDropdown></NavItem>
    </Nav>
</div>

<style>
    a {
        color: #1e90ff;
        text-decoration: none;
        font-weight: bold;
    }
    div {
        background-color: #1e90ff;
        color: #ffffff;
        padding: 5px;   
    }
    h2 {
        font-size: 25px;
        font-weight: normal;
        margin-right: 1%;
        margin-left: 1%;
    }
    h6{
        color: white;
    }
</style>
  
  