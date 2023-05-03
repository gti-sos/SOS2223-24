<script>
    import {Icon,ButtonDropdown, Dropdown, DropdownItem,DropdownMenu,DropdownToggle,Nav,NavItem,NavLink,} from "sveltestrap";
    let isOpen = false;
</script>

<div class="header-wrapper">
    <h2>SOS2223-<span class="accent-color">24</span></h2>

    <Nav style="display: flex;">
        <NavLink href="/" class="nav-link" style="margin-right: 20px;" ><h6 style="font-weight:bold;  color:black; font-size: 18px;">Inicio</h6> <Icon name="house-fill"/></NavLink>
        <NavItem>
            <ButtonDropdown>
                <DropdownToggle color="" style="font-weight:bold; color = #; font-size: 18px;" caret>Front-ends</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Tipos:</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><a href="/agrodata-almeria">agrodata-almeria</a></DropdownItem>
                    <DropdownItem><a href="/agroprices-weekly">agroprices-weekly</a></DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </NavItem>

        <NavItem>
            <Dropdown nav {isOpen} toggle={() => (isOpen = !isOpen)}>
                <DropdownToggle nav caret style="font-weight:bold; color:black; font-size: 18px;">Provisions</DropdownToggle>
                <DropdownMenu>
                <DropdownItem><a href="/provisions-for-the-year-2014">Página de Inicio</a></DropdownItem>
                <DropdownItem divider/>
                <DropdownItem><a href="/provisions-for-the-year-2014/graphs">Grafos</a></DropdownItem>     
              </DropdownMenu>
            </Dropdown>

        </NavItem>
    </Nav>
</div>

<style>
    .header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #e8a8a8;
        color: #ffffff;
        padding: 20px; 
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.05em;
    }
    .accent-color {
        color: #ff0000;
    }
    a {
        color: #000000;
        text-decoration: none;
        font-weight: bold;
    }

</style>
