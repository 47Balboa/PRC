<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title><xsl:value-of select="pr/meta/title"/></title>
                <meta charset="UTF8" />
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </head>
            <body>
                <h2><center>Project Record</center></h2>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="pr">
        <xsl:apply-templates select="meta"/>
        <hr/>
        <hr/>
        <div class="w3-container">
            <xsl:apply-templates select="workteam"/>
        </div>
        <hr/>
        <hr/>
        <div class="w3-container">
            <xsl:apply-templates select="abstract"/>
        </div>
        <hr/>
        <hr/>
        <div class="w3-container bottom">
            <xsl:apply-templates select="deliverables"/>
        </div>
        
    </xsl:template>
    
    <xsl:template match="meta">
        <table style="width:100%">
           <tr>
             <td><b>KEY NAME:</b><xsl:value-of select="keyname"/></td>
             <td><b>BEGIN DATE:<xsl:value-of select="bdate"/></b></td> 
           </tr>
           <tr>
             <td><b>TITLE:</b><xsl:value-of select="title"/></td>
             <td><b>END DATE:<xsl:value-of select="edate"/></b></td>  
           </tr>
           <tr>
               <td><xsl:choose>
                   <xsl:when test="subtitle">
                       <b>Subtitle: </b>
                       <xsl:value-of select="subtitle"/>
                   </xsl:when>
               </xsl:choose>
               </td>
               <td><b>SUPERVISOR:<xsl:value-of select="supervisor"/></b></td>    
           </tr>       
        </table>
    </xsl:template>
    
    <xsl:template match="workteam">
        <h4><b>Workteam:</b></h4>
            <xsl:apply-templates select="member"/>
    </xsl:template>
    
 
    <xsl:template match="member">
        
                <p> <xsl:value-of select="identifier"/> -
                    <xsl:value-of select="name"/> -
                    <a href="mailto:{email}"><xsl:value-of select="email"/> </a> </p>
                <p> <img src="{photo/@path}" width="120" height="120"></img> </p>
         
        
  
    </xsl:template>
    
    <xsl:template match="abstract">
        <h4><b>Abstract:</b></h4>
        <xsl:apply-templates select="p"/>  
        
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>    
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>    
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>    
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>    
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}" target="_blank"><xsl:apply-templates/></a>
    </xsl:template>
   
    <xsl:template match="deliverables">
        <h4><b>Deliverables:</b></h4>
        <ul>
            <xsl:apply-templates select="deliverable"/>
        </ul>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}" target="_blank"> <xsl:value-of select="."/></a>
            
        </li>
        
    </xsl:template>
</xsl:stylesheet>







