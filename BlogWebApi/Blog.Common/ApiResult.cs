namespace Blog.Common
{
  public class ApiResult<T>
  where T : class
  {
    public T Value { get; set; }
    public Metadata Metadata { get; set; }
  }
}
