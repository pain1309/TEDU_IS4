using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApiResource.Data;
using TestApiResource.Data.Models;

namespace TestApiResource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RrsVNExpressesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RrsVNExpressesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RrsVNExpresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RrsVNExpress>>> GetRrsVNExpresss()
        {
            return await _context.RrsVNExpresss.ToListAsync();
        }

        // GET: api/RrsVNExpresses/5
        [HttpGet("{category}")]
        public async Task<IEnumerable<RrsVNExpress>> GetRrsVNExpress(string category)
        {
            var rrsVNExpress = await _context.RrsVNExpresss.Where(rrs => rrs.Category == category).ToListAsync();

            if (rrsVNExpress == null)
            {
                return null;
            }

            return rrsVNExpress;
        }

        [Route("GetRrsVNExpressById/{id?}")]
        public async Task<RrsVNExpress> GetRrsVNExpressById(int id)
        {
            var rrsVNExpress = await _context.RrsVNExpresss.Where(rrs => rrs.Id == id).FirstOrDefaultAsync();

            if (rrsVNExpress == null)
            {
                return null;
            }

            return rrsVNExpress;
        }

        // PUT: api/RrsVNExpresses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRrsVNExpress(int id, RrsVNExpress rrsVNExpress)
        {
            if (id != rrsVNExpress.Id)
            {
                return BadRequest();
            }

            _context.Entry(rrsVNExpress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RrsVNExpressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RrsVNExpresses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RrsVNExpress>> PostRrsVNExpress(RrsVNExpress rrsVNExpress)
        {
            _context.RrsVNExpresss.Add(rrsVNExpress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRrsVNExpress", new { id = rrsVNExpress.Id }, rrsVNExpress);
        }

        // DELETE: api/RrsVNExpresses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RrsVNExpress>> DeleteRrsVNExpress(int id)
        {
            var rrsVNExpress = await _context.RrsVNExpresss.FindAsync(id);
            if (rrsVNExpress == null)
            {
                return NotFound();
            }

            _context.RrsVNExpresss.Remove(rrsVNExpress);
            await _context.SaveChangesAsync();

            return rrsVNExpress;
        }

        private bool RrsVNExpressExists(int id)
        {
            return _context.RrsVNExpresss.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("crawldata")]
        public IEnumerable<RrsVNExpress> CrawlData()
        {
            var listRss = GetRss("https://vnexpress.net/rss").Result;
            var RSSFeedData = new List<RrsVNExpress>();
            foreach (var rss in listRss)
            {
                WebClient wclient = new WebClient();
                string RSSData = wclient.DownloadString("https://vnexpress.net/" + rss);

                XDocument xml = XDocument.Parse(RSSData);
                RSSFeedData.AddRange((from x in xml.Descendants("item")

                                   select new RrsVNExpress
                                   {
                                       Title = ((string)x.Element("title")),
                                       Link = ((string)x.Element("link")),
                                       Description = ((string)x.Element("description")),
                                       PubDate = ((DateTime)x.Element("pubDate")),
                                       ImageUrl = "",
                                       Content = "",
                                       Category = (rss.Split('.')[0]).Split('/')[2]
                                   }).Where(news => !CheckDuplicate(_context, news)).AsEnumerable().Select(c => new RrsVNExpress
                                   {
                                       Title = c.Title,
                                       Link = c.Link,
                                       Description = c.Description,
                                       PubDate = c.PubDate,
                                       ImageUrl = decodeCData(c.Description),
                                       Content = GetContent(c.Link).Result,
                                       Category = c.Category
                                   }));
                // Return the string that contain the RSS items
                _context.RrsVNExpresss.AddRange(RSSFeedData);
            }
            _context.SaveChanges();
            return RSSFeedData;
        }
        public static Boolean CheckDuplicate(ApplicationDbContext _context, RrsVNExpress news)
        {
            return _context.RrsVNExpresss.Any(item => item.Category == news.Category && item.Title == news.Title);
        }
        public static string decodeCData(string xml)
        {
            var desiredValue = Regex.Match(xml, "<img.+?src=[\"'](.+?)[\"'].+?>", RegexOptions.IgnoreCase).Groups[1].Value;
            return desiredValue != null ? desiredValue : "";
        }
        public async static Task<IEnumerable<string>> GetRss(string url)
        {
            var listRssVNExpress = new List<string>();
            var httpClient = new HttpClient();
            var html = await httpClient.GetStringAsync(url);
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);
            var ulList = htmlDocument.DocumentNode.Descendants("ul")
                .Where(node => node.GetAttributeValue("class", "").Equals("list-rss")).ToList();
            foreach (var ul in ulList)
            {
                var listAddress = ul.Descendants("a").ToList();
                foreach(var address in listAddress)
                {
                    listRssVNExpress.Add(address.ChildAttributes("href").FirstOrDefault().Value);
                    if (listRssVNExpress.Count() > 2)
                        return listRssVNExpress;
                }
            }
            return listRssVNExpress;
        }
        public async static Task<string> GetContent(string url)
        {
            var httpClient = new HttpClient();
            var stringReturl = "";
            var html = await httpClient.GetStringAsync(url);
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);
            var contentList = htmlDocument.DocumentNode.Descendants("p")
                .Where(node => node.GetAttributeValue("class", "").Equals("Normal")).ToList();
            foreach(var content in contentList)
            {
                stringReturl += "<p>" + content.InnerText + "</p>";
            }
            return stringReturl;
        }
    }
}
