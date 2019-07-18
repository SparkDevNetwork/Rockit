<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ReferralAgencyList.ascx.cs" Inherits="RockWeb.Plugins.org_rocksolidchurch.SampleProject.ReferralAgencyList" %>
<asp:UpdatePanel ID="upnlContent" runat="server">
    <ContentTemplate>

        <asp:Panel ID="pnlReferralAgencyList" CssClass="panel panel-block" runat="server">

            <div class="panel-heading">
                <h1 class="panel-title"><i class="fa fa-check-square-o"></i> Referral Agency List</h1>
            </div>
            <div class="panel-body">

                <Rock:GridFilter ID="gfSettings" runat="server">
                    <Rock:CampusPicker ID="cpCampus" runat="server" Label="Campus" />
                    <Rock:DefinedValuePicker ID="dvpAgencyType" runat="server" Label="Agency Type"></Rock:DefinedValuePicker>
                </Rock:GridFilter>

                <Rock:ModalAlert ID="mdGridWarning" runat="server" />

                <Rock:Grid ID="gAgencies" runat="server" AllowSorting="true" OnRowSelected="gAgencies_Edit" TooltipField="Description">
                    <Columns>
                        <asp:BoundField DataField="Name" HeaderText="Agency Name" SortExpression="Name" />
                        <asp:BoundField DataField="Campus.Name" HeaderText="Campus" SortExpression="Campus.Name" />
                        <asp:BoundField DataField="AgencyTypeValue.Value" HeaderText="Type" SortExpression="AgencyTypeValue.Value" />
                        <asp:BoundField DataField="ContactName" HeaderText="Contact Name" SortExpression="ContactName" />
                        <asp:BoundField DataField="PhoneNumber" HeaderText="Phone Number" SortExpression="PhoneNumber" />
                        <asp:BoundField DataField="Website" HeaderText="Website" SortExpression="Website" />
                        <Rock:DeleteField OnClick="gAgencies_Delete" />
                    </Columns>
                </Rock:Grid>

            </div>

        </asp:Panel>

    </ContentTemplate>
</asp:UpdatePanel>
