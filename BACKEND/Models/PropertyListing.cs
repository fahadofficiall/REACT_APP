using System;
using System.Collections.Generic;

namespace RealEstateBackendAPI.Models;

public partial class PropertyListing
{
    public int Id { get; set; }

    public string? PropertyType { get; set; }

    public long? PropertyValue { get; set; }

    public string? PropertyInfo { get; set; }

    public long? OwnerContactNbr { get; set; }

    public string? PropertyCity { get; set; }

    public string? PropertyAction { get; set; }

    public bool? MoveInFlag { get; set; }
}
