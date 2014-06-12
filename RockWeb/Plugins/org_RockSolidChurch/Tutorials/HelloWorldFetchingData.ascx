<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HelloWorldFetchingData.ascx.cs" 
    Inherits="RockWeb.Plugins.org_rocksolidchurch.Tutorials.HelloWorldFetchingData" %>

<asp:UpdatePanel ID="upnlContent" runat="server">
    <ContentTemplate>

        <Rock:Grid ID="gPeople" runat="server" AllowSorting="true"
             OnRowSelected="gPeople_RowSelected" DataKeyNames="Id">
            <Columns>
                <asp:BoundField DataField="FirstName" HeaderText="First Name" />
                <asp:BoundField DataField="LastName" HeaderText="Last Name" />
            </Columns>
        </Rock:Grid>

    </ContentTemplate>
</asp:UpdatePanel>
