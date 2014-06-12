// <copyright>
// Copyright 2013 by the Spark Development Network
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
//
using System;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

using Rock;
using Rock.Data;
using Rock.Model;
using Rock.Web.Cache;
using Rock.Web.UI.Controls;
using Rock.Attribute;
using Rock.Security;

namespace RockWeb.Plugins.org_rocksolidchurch.Tutorials
{
    /// <summary>
    /// Template block for developers to use to start a new block.
    /// </summary>
    [DisplayName( "Hello World Fetching Data" )]
    [Category( "rocksolidchurch > Tutorials" )]
    [Description( "A simple block to fetch some data from Rock." )]

    [CustomRadioListField( "Gender Filter", "Select in order to list only records for that gender",
         "1:Male,2:Female", required: false )]
    [LinkedPage( "Related Page" )]
    public partial class HelloWorldFetchingData : Rock.Web.UI.RockBlock
    {
        #region Fields

        // used for private variables

        #endregion

        #region Properties

        // used for public / protected properties

        #endregion

        #region Base Control Methods

        //  overrides of the base RockBlock methods (i.e. OnInit, OnLoad)

        /// <summary>
        /// Raises the <see cref="E:System.Web.UI.Control.Init" /> event.
        /// </summary>
        /// <param name="e">An <see cref="T:System.EventArgs" /> object that contains the event data.</param>
        protected override void OnInit( EventArgs e )
        {
            base.OnInit( e );

            if ( IsUserAuthorized( Authorization.EDIT ) )
            {
                gPeople.Actions.ShowAdd = true;
                gPeople.Actions.AddClick += gPeople_Add;
            }

            // or based on the person's edit rights for the page where this block lives...
            //
            //var currentPage = Rock.Web.Cache.PageCache.Read( RockPage.PageId );
            //currentPage.IsAuthorized( Authorization.EDIT, CurrentPerson );

            // this event gets fired after block settings are updated. it's nice to repaint the screen if these settings would alter it
            this.BlockUpdated += Block_BlockUpdated;
            this.AddConfigurationUpdateTrigger( upnlContent );
        }

        /// <summary>
        /// Raises the <see cref="E:System.Web.UI.Control.Load" /> event.
        /// </summary>
        /// <param name="e">The <see cref="T:System.EventArgs" /> object that contains the event data.</param>
        protected override void OnLoad( EventArgs e )
        {
            base.OnLoad( e );

            if ( !Page.IsPostBack )
            {
                BindGrid();
            }
        }

        #endregion

        #region Events

        // handlers called by the controls on your block

        /// <summary>
        /// Handles the BlockUpdated event of the control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected void Block_BlockUpdated( object sender, EventArgs e )
        {
            BindGrid();
        }

        /// <summary>
        /// Handles the Add event of the grid.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected void gPeople_Add( object sender, EventArgs e )
        {
            Response.Redirect( "~/NewFamily/" );
        }

        /// <summary>
        /// Event handler that redirects to the related page when a row in the grid is clicked.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="RowEventArgs"/> instance containing the event data.</param>
        protected void gPeople_RowSelected( object sender, RowEventArgs e )
        {
            NavigateToLinkedPage( "RelatedPage", "PersonId", (int)e.RowKeyValues["Id"] );
        }
  
        #endregion

        #region Methods

        protected void BindGrid()
        {
            var genderValue = GetAttributeValue( "GenderFilter" );

            var query = new PersonService( new RockContext() ).Queryable();

            if ( !string.IsNullOrEmpty( genderValue ) )
            {
                Gender gender = genderValue.ConvertToEnum<Gender>();
                query = query.Where( p => p.Gender == gender );
            }

            gPeople.DataSource = query.ToList();
            gPeople.DataBind();
        }

        #endregion
    }
}