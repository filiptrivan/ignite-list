using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IgniteList.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedUpvoteCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UpvoteCount",
                table: "Project",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpvoteCount",
                table: "Project");
        }
    }
}
